<?php
// Creates (or replaces) the admin login file used by public/api/auth.php.
//
//   php scripts/create-admin.php [output-path]
//
// Default output is ./firefly-data/admin.json (used by local dev). On the server the
// file belongs in the firefly-data folder next to public_html, e.g.
// /home/<cpanel-user>/firefly-data/admin.json

if (PHP_SAPI !== 'cli') {
    exit("Run this from the command line.\n");
}

$out = $argv[1] ?? dirname(__DIR__) . '/firefly-data/admin.json';

function prompt(string $label, bool $hidden = false): string
{
    echo $label;
    if ($hidden && DIRECTORY_SEPARATOR === '/') {
        system('stty -echo');
        $value = trim((string) fgets(STDIN));
        system('stty echo');
        echo "\n";
        return $value;
    }
    return trim((string) fgets(STDIN));
}

$username = prompt('Admin username: ');
if ($username === '') {
    exit("Username is required.\n");
}
$password = prompt('Password (min 10 characters): ', true);
if (strlen($password) < 10) {
    exit("Password must be at least 10 characters.\n");
}
if (prompt('Repeat password: ', true) !== $password) {
    exit("Passwords do not match.\n");
}

if (!is_dir(dirname($out))) {
    mkdir(dirname($out), 0750, true);
}
file_put_contents($out, json_encode([
    'username' => $username,
    'passwordHash' => password_hash($password, PASSWORD_DEFAULT),
], JSON_PRETTY_PRINT) . "\n");
chmod($out, 0640);

echo "Saved $out\n";
