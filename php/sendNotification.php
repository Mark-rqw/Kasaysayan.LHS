<?php
// sendNotification.php

// Firebase server key (replace this with your actual server key from FCM settings)
$serverKey = "BO2KHuS3C48Q5cD5Ov8pzg4YtnYfsJhtebO92cufVdJsO7PnOvok0RrPJGncUvB5ZYFKdinuLap_r855UD_cdYo";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    exit('Invalid request method.');
}
// Check if the request is POST and contains the required fields
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['title']) && isset($_POST['body'])) {

    $title = $_POST['title'];   // Custom title from form input
    $body = $_POST['body'];     // Custom message body
    $image = isset($_POST['image']) ? $_POST['image'] : ''; // Optional image URL

    // Fetch stored tokens (ensure this matches how you store tokens in your database)
    $conn = new mysqli("localhost", "root", " ", "kasaysayandb");
    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    }

    $tokens = [];
    $result = $conn->query("SELECT token FROM fcm_tokens");
    while ($row = $result->fetch_assoc()) {
        $tokens[] = $row['token'];
    }
    $conn->close();

    if (count($tokens) == 0) {
        die("No tokens available to send notifications.");
    }

    // Notification payload
    $notification = [
        'title' => $title,
        'body' => $body,
        'image' => $image
    ];

    // FCM payload
    $payload = [
        'registration_ids' => $tokens,
        'notification' => $notification
    ];

    // Send request to FCM
    $headers = [
        'Authorization: key=' . $serverKey,
        'Content-Type: application/json'
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

    $response = curl_exec($ch);
    curl_close($ch);

    echo "Notification sent! Response: " . $response;

} else {
    echo "Invalid request. Please use POST method with title and body.";
}
?>
