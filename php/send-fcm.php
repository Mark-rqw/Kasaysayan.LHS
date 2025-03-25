<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "kasaysayandb";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get all FCM tokens
$result = $conn->query("SELECT token FROM fcm_tokens");
$tokens = [];
while ($row = $result->fetch_assoc()) {
    $tokens[] = $row['token'];
}

$title = $_POST['title'];
$body = $_POST['body'];

$conn->close();

// FCM Server Key (from Firebase Console > Cloud Messaging)
$fcm_server_key = "BO2KHuS3C48Q5cD5Ov8pzg4YtnYfsJhtebO92cufVdJsO7PnOvok0RrPJGncUvB5ZYFKdinuLap_r855UD_cdYo";

$headers = [
    "Authorization: key=$fcm_server_key",
    "Content-Type: application/json"
];

$notification = [
    "registration_ids" => $tokens, 
    "notification" => [
        "title" => $title,
        "body" => $body,
        "icon" => "assets/Kasaysayan_logo.png"
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://fcm.googleapis.com/fcm/send");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($notification));
$response = curl_exec($ch);
curl_close($ch);

echo "Notification Sent!";
?>
