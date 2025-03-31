<?php
session_start();

$servername = "localhost"; // Change if using a different server
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "Kasaysayandb"; // The database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["signup"])){

    $username = $_POST["username"];
    $password = $_POST["password"];


    $sql = "INSERT INTO users (username, password) values ('$username', '$password')";
    $conn->query($sql);
}

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Username already taken"]);
} else {
    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Signup successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
    }
}
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=M, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
      
<form method="POST" action="signup.php">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit" name="signup">Sign Up</button>

        <a href="login.php">Log In</a>
    </form>
</body>
</html>