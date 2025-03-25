<?php
// sendNotification.php
$host = 'localhost';
$dbname = 'kasaysayandb';
$user = 'root';
$password = '';

$conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

// Get tokens from database
$stmt = $conn->query("SELECT token FROM fcm_tokens");
$tokens = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Prepare FCM message
$message = [
    "registration_ids" => $tokens,
    "notification" => [
        "title" => "Kasaysayan Update!",
        "body" => "Check out the new facts and trivia.",
        "icon" => "assets/Kasaysayan_logo.png",
    ]
];

// Send to FCM
$headers = [
    "Authorization: key=YOUR_SERVER_KEY",
    "Content-Type: application/json"
];

$ch = curl_init("https://fcm.googleapis.com/fcm/send");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($message));

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>

