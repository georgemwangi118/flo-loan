<?php
// GET  -> { authenticated, username, csrfToken, configured }
// POST { action: "login", username, password }
// POST { action: "logout" }
// POST { action: "change-password", currentPassword, newPassword }

require __DIR__ . '/_bootstrap.php';

$method = require_method('GET', 'POST');
start_session();
$admin = read_json_file(ADMIN_FILE);

if ($method === 'GET') {
    json_response([
        'authenticated' => is_authenticated(),
        'username' => is_authenticated() ? ($_SESSION['admin'] ?? '') : null,
        'csrfToken' => $_SESSION['csrf'],
        'configured' => $admin !== null,
    ]);
}

$body = read_json_body();
$action = $body['action'] ?? '';

$token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
if (!is_string($token) || !hash_equals($_SESSION['csrf'], $token)) {
    fail('Invalid security token. Reload the page and try again.', 403);
}

if ($action === 'login') {
    if ($admin === null) {
        fail('Admin account has not been set up on the server yet.', 503);
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $attempts = read_json_file(ATTEMPTS_FILE) ?? [];
    $now = time();
    // Drop expired entries so the file doesn't grow forever.
    $attempts = array_filter($attempts, function ($a) use ($now) {
        return $now - (int) ($a['first'] ?? 0) < LOCKOUT_SECONDS;
    });
    $entry = $attempts[$ip] ?? ['count' => 0, 'first' => $now];
    if ($entry['count'] >= MAX_LOGIN_ATTEMPTS) {
        $wait = (int) ceil((LOCKOUT_SECONDS - ($now - $entry['first'])) / 60);
        fail("Too many failed attempts. Try again in {$wait} minute(s).", 429);
    }

    $username = (string) ($body['username'] ?? '');
    $password = (string) ($body['password'] ?? '');
    $ok = hash_equals((string) $admin['username'], $username)
        && password_verify($password, (string) $admin['passwordHash']);

    if (!$ok) {
        $entry['count']++;
        $attempts[$ip] = $entry;
        write_json_file(ATTEMPTS_FILE, $attempts);
        fail('Incorrect username or password.', 401);
    }

    unset($attempts[$ip]);
    write_json_file(ATTEMPTS_FILE, $attempts);

    if (password_needs_rehash((string) $admin['passwordHash'], PASSWORD_DEFAULT)) {
        $admin['passwordHash'] = password_hash($password, PASSWORD_DEFAULT);
        write_json_file(ADMIN_FILE, $admin);
    }

    session_regenerate_id(true);
    $_SESSION['admin'] = $admin['username'];
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
    json_response(['success' => true, 'username' => $admin['username'], 'csrfToken' => $_SESSION['csrf']]);
}

if ($action === 'logout') {
    $_SESSION = [];
    session_regenerate_id(true);
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
    json_response(['success' => true, 'csrfToken' => $_SESSION['csrf']]);
}

if ($action === 'change-password') {
    require_admin();
    $current = (string) ($body['currentPassword'] ?? '');
    $new = (string) ($body['newPassword'] ?? '');
    if (!password_verify($current, (string) $admin['passwordHash'])) {
        fail('Current password is incorrect.', 401);
    }
    if (strlen($new) < 10) {
        fail('New password must be at least 10 characters.');
    }
    $admin['passwordHash'] = password_hash($new, PASSWORD_DEFAULT);
    write_json_file(ADMIN_FILE, $admin);
    json_response(['success' => true]);
}

fail('Unknown action');
