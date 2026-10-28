<?php
// POST multipart/form-data with field "image" -> { success, url }   (admin only)

require __DIR__ . '/_bootstrap.php';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/gif' => 'gif',
];

require_method('POST');
start_session();
require_admin();

$file = $_FILES['image'] ?? null;
if (!is_array($file) || !isset($file['error']) || is_array($file['error'])) {
    fail('No image was uploaded.');
}
if ($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE || $file['size'] > MAX_UPLOAD_BYTES) {
    fail('Image is too large. The limit is 5 MB.', 413);
}
if ($file['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) {
    fail('Upload failed. Please try again.');
}

// Trust the file's actual bytes, never the name or the browser-supplied type.
$mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
if (!isset(ALLOWED_TYPES[$mime]) || @getimagesize($file['tmp_name']) === false) {
    fail('Only JPG, PNG, WebP or GIF images are allowed.');
}

$subdir = gmdate('Y/m');
$dir = UPLOADS_DIR . '/' . $subdir;
if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
    fail('Upload folder is not writable.', 500);
}

$name = bin2hex(random_bytes(12)) . '.' . ALLOWED_TYPES[$mime];
if (!move_uploaded_file($file['tmp_name'], $dir . '/' . $name)) {
    fail('Could not save the image.', 500);
}
@chmod($dir . '/' . $name, 0644);

json_response(['success' => true, 'url' => UPLOADS_URL . '/' . $subdir . '/' . $name]);
