<?php
// Shared setup for the admin API: paths, sessions, JSON helpers, auth and CSRF checks.
// Written for PHP 7.4+ so it runs on typical shared hosting.

declare(strict_types=1);

// Private data (content.json, admin.json, backups, login attempts) lives OUTSIDE the
// web root so it can't be downloaded and isn't overwritten when dist/ is redeployed.
// On cPanel: /home/<user>/public_html/api -> /home/<user>/firefly-data
define('DATA_DIR', getenv('FIREFLY_DATA_DIR') ?: dirname(__DIR__, 2) . '/firefly-data');

// Uploaded images must be publicly reachable, so they live inside the web root.
define('UPLOADS_DIR', dirname(__DIR__) . '/uploads');
define('UPLOADS_URL', '/uploads');

define('CONTENT_FILE', DATA_DIR . '/content.json');
define('ADMIN_FILE', DATA_DIR . '/admin.json');
define('BACKUPS_DIR', DATA_DIR . '/backups');
define('ATTEMPTS_FILE', DATA_DIR . '/login-attempts.json');

define('MAX_BACKUPS', 30);
define('MAX_CONTENT_BYTES', 2 * 1024 * 1024);
define('SESSION_IDLE_SECONDS', 2 * 60 * 60);
define('MAX_LOGIN_ATTEMPTS', 5);
define('LOCKOUT_SECONDS', 15 * 60);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function json_response(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(string $message, int $status = 400): void
{
    json_response(['success' => false, 'message' => $message], $status);
}

function require_method(string ...$methods): string
{
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if (!in_array($method, $methods, true)) {
        header('Allow: ' . implode(', ', $methods));
        fail('Method not allowed', 405);
    }
    return $method;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > MAX_CONTENT_BYTES) {
        fail('Request too large', 413);
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        fail('Invalid JSON');
    }
    return $data;
}

function ensure_dir(string $dir): void
{
    if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
        fail('Server storage is not writable', 500);
    }
}

function read_json_file(string $path): ?array
{
    if (!is_file($path)) {
        return null;
    }
    $data = json_decode((string) file_get_contents($path), true);
    return is_array($data) ? $data : null;
}

// Write via a temp file + rename so a crash mid-write never leaves a half-written file.
function write_json_file(string $path, array $data): void
{
    ensure_dir(dirname($path));
    $tmp = $path . '.' . bin2hex(random_bytes(6)) . '.tmp';
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false || file_put_contents($tmp, $json, LOCK_EX) === false || !rename($tmp, $path)) {
        @unlink($tmp);
        fail('Could not save data', 500);
    }
}

function is_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
}

function start_session(): void
{
    session_name('FIREFLYADMIN');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => is_https(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();

    $now = time();
    if (isset($_SESSION['last_seen']) && $now - $_SESSION['last_seen'] > SESSION_IDLE_SECONDS) {
        $_SESSION = [];
        session_regenerate_id(true);
    }
    $_SESSION['last_seen'] = $now;

    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
}

function is_authenticated(): bool
{
    return !empty($_SESSION['admin']);
}

// Every state-changing request must be logged in AND carry the session's CSRF token.
function require_admin(): void
{
    if (!is_authenticated()) {
        fail('Not logged in', 401);
    }
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!is_string($token) || !hash_equals($_SESSION['csrf'], $token)) {
        fail('Invalid security token. Reload the page and try again.', 403);
    }
}

// Keep a copy of the current content before it is replaced, pruning the oldest copies.
function backup_content(array $record): void
{
    ensure_dir(BACKUPS_DIR);
    $name = 'content-' . gmdate('Ymd-His') . '-' . bin2hex(random_bytes(3)) . '.json';
    write_json_file(BACKUPS_DIR . '/' . $name, $record);

    $files = glob(BACKUPS_DIR . '/content-*.json') ?: [];
    sort($files);
    while (count($files) > MAX_BACKUPS) {
        @unlink(array_shift($files));
    }
}
