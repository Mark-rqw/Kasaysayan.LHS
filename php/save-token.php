<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "kasaysayandb";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get token from request
$data = json_decode(file_get_contents("php://input"), true);
$token = $data['token'];

// Store token in database
$stmt = $conn->prepare("INSERT INTO fcm_tokens (token) VALUES (?) ON DUPLICATE KEY UPDATE token = ?");
$stmt->bind_param("ss", $token, $token);
$stmt->execute();

echo json_encode(["status" => "success"]);
$conn->close();
?>