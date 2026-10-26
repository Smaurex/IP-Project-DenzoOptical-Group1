<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

function respond($status, $message, $data = null)
{
    http_response_code($status);
    $response = ['success' => $status >= 200 && $status < 300];
    if ($response['success']) {
        $response['data'] = $data;
    } else {
        $response['error'] = ['message' => $message];
    }
    echo json_encode($response);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, 'Method not allowed');
}

if (empty($_COOKIE['token'])) {
    respond(401, 'Authentication required');
}

if (!preg_match('/^[A-Za-z0-9_.-]+$/', $_COOKIE['token'])) {
    respond(401, 'Authentication required');
}

if (!function_exists('curl_init')) {
    respond(500, 'Server authentication bridge is unavailable');
}

$apiBase = getenv('API_BASE_URL');
if ($apiBase === false || trim($apiBase) === '') {
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if (preg_match('/^(localhost|127\.0\.0\.1)(:\d+)?$/i', $host, $matches)) {
        $apiBase = 'http://' . $matches[1] . ':3000/api';
    } elseif (strcasecmp($host, 'denzo.dcism.org') === 0) {
        $apiBase = 'https://denzo.dcism.org/api';
    } else {
        respond(500, 'API session bridge is not configured for this host');
    }
}
$apiBase = rtrim($apiBase, '/');

$curl = curl_init($apiBase . '/auth/me');
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => ['Cookie: token=' . $_COOKIE['token']]
]);
$apiBody = curl_exec($curl);
$apiStatus = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
$curlError = curl_error($curl);
curl_close($curl);

if ($apiBody === false) {
    error_log('API session validation failed: ' . $curlError);
    respond(502, 'Unable to validate the API session');
}

$apiResponse = json_decode($apiBody, true);
if ($apiStatus === 401) {
    respond(401, 'Authentication required');
}
if ($apiStatus !== 200 || !is_array($apiResponse) || empty($apiResponse['success']) || !isset($apiResponse['data'])) {
    respond(502, 'Unable to validate the API session');
}

$user = $apiResponse['data'];
$requiredFields = ['userID', 'username', 'email', 'role', 'profile_pic'];
foreach ($requiredFields as $field) {
    if (!array_key_exists($field, $user) || !is_scalar($user[$field])) {
        respond(502, 'The API returned an invalid user profile');
    }
}

if (!in_array($user['role'], ['doctor', 'assistant', 'patient'], true)) {
    respond(403, 'This account has an unsupported role');
}

session_regenerate_id(true);
$_SESSION['userID'] = $user['userID'];
$_SESSION['username'] = $user['username'];
$_SESSION['email'] = $user['email'];
$_SESSION['role'] = $user['role'];
$_SESSION['profile_pic'] = $user['profile_pic'];

respond(200, '', [
    'userID' => $user['userID'],
    'username' => $user['username'],
    'email' => $user['email'],
    'role' => $user['role'],
    'profile_pic' => $user['profile_pic']
]);
