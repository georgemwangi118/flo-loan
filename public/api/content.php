<?php
// GET  -> { content: SiteContent|null, updatedAt }   (public; null = site uses its built-in defaults)
// POST { content: SiteContent }                       (admin only; previous version is backed up)

require __DIR__ . '/_bootstrap.php';

const REQUIRED_SECTIONS = ['general', 'slides', 'home', 'loans', 'about', 'contact', 'footer', 'terms', 'privacy'];
const RESERVED_SLUGS = ['admin', 'about', 'contact', 'terms-and-conditions', 'privacy-policy', 'api', 'uploads', 'images', 'assets', 'scripts', 'loans'];
const IMAGE_KEYS = ['image', 'heroImage'];

$method = require_method('GET', 'POST');

if ($method === 'GET') {
    $stored = read_json_file(CONTENT_FILE);
    json_response([
        'content' => $stored['content'] ?? null,
        'updatedAt' => $stored['updatedAt'] ?? null,
    ]);
}

start_session();
require_admin();

$body = read_json_body();
$content = $body['content'] ?? null;
if (!is_array($content)) {
    fail('Missing content');
}
validate_content($content);

$previous = read_json_file(CONTENT_FILE);
if ($previous !== null) {
    backup_content($previous);
}

$record = [
    'updatedAt' => gmdate('c'),
    'updatedBy' => $_SESSION['admin'],
    'content' => $content,
];
write_json_file(CONTENT_FILE, $record);
json_response(['success' => true, 'updatedAt' => $record['updatedAt']]);

function validate_content(array $content): void
{
    foreach (REQUIRED_SECTIONS as $key) {
        if (!isset($content[$key]) || !is_array($content[$key])) {
            fail("Content is missing the \"$key\" section.");
        }
    }
    validate_value($content, 0, '');

    $slugs = [];
    foreach ($content['loans'] as $i => $loan) {
        $n = $i + 1;
        $slug = is_array($loan) ? ($loan['slug'] ?? '') : '';
        $name = is_array($loan) ? trim((string) ($loan['name'] ?? '')) : '';
        if ($name === '') {
            fail("Loan #$n needs a name.");
        }
        if (!is_string($slug) || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) {
            fail("\"$name\" has an invalid page address. Use lowercase letters, numbers and dashes only.");
        }
        if (in_array($slug, RESERVED_SLUGS, true)) {
            fail("\"$name\" can't use the page address \"$slug\" because the site already uses it.");
        }
        if (isset($slugs[$slug])) {
            fail("Two loans use the same page address \"$slug\".");
        }
        $slugs[$slug] = true;
    }
}

// Allow only plain JSON data of a sane size, and only safe image URLs.
function validate_value($value, int $depth, string $key): void
{
    if ($depth > 8) {
        fail('Content is nested too deeply.');
    }
    if (is_array($value)) {
        foreach ($value as $k => $v) {
            validate_value($v, $depth + 1, is_string($k) ? $k : $key);
        }
        return;
    }
    if (is_string($value)) {
        if (strlen($value) > 50000) {
            fail('A text field is too long.');
        }
        if (in_array($key, IMAGE_KEYS, true) && $value !== '' && !is_safe_image_url($value)) {
            fail("Invalid image address: $value");
        }
        return;
    }
    if ($value !== null && !is_bool($value) && !is_int($value) && !is_float($value)) {
        fail('Content contains an unsupported value.');
    }
}

function is_safe_image_url(string $url): bool
{
    if (preg_match('#^/(?!/)[A-Za-z0-9._~/%-]+$#', $url)) {
        return true;
    }
    return (bool) preg_match('#^https://[A-Za-z0-9.-]+(?::\d+)?/[A-Za-z0-9._~/%?=&+-]*$#', $url);
}
