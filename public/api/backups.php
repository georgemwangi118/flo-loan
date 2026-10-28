<?php
// GET  -> { backups: [{ id, savedAt, updatedBy }] }   newest first
// POST { id } -> restores that version (the current one is backed up first)
// Admin only.

require __DIR__ . '/_bootstrap.php';

$method = require_method('GET', 'POST');
start_session();

if ($method === 'GET') {
    if (!is_authenticated()) {
        fail('Not logged in', 401);
    }
    $files = glob(BACKUPS_DIR . '/content-*.json') ?: [];
    rsort($files);
    $backups = [];
    foreach ($files as $path) {
        $record = read_json_file($path);
        $backups[] = [
            'id' => basename($path, '.json'),
            'savedAt' => $record['updatedAt'] ?? null,
            'updatedBy' => $record['updatedBy'] ?? null,
        ];
    }
    json_response(['backups' => $backups]);
}

require_admin();
$id = (string) (read_json_body()['id'] ?? '');
if (!preg_match('/^content-\d{8}-\d{6}-[a-f0-9]{6}$/', $id)) {
    fail('Invalid backup id');
}
$restored = read_json_file(BACKUPS_DIR . '/' . $id . '.json');
if ($restored === null || !isset($restored['content'])) {
    fail('Backup not found', 404);
}

$current = read_json_file(CONTENT_FILE);
if ($current !== null) {
    backup_content($current);
}
$record = [
    'updatedAt' => gmdate('c'),
    'updatedBy' => $_SESSION['admin'],
    'content' => $restored['content'],
];
write_json_file(CONTENT_FILE, $record);
json_response(['success' => true, 'content' => $record['content'], 'updatedAt' => $record['updatedAt']]);
