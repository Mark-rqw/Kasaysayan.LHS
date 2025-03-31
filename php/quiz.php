<?php
session_start();

$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "Kasaysayandb"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php"); 
    exit;
}
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Define questions and answers
$questions = [
    [
        "question" => "What is the capital of France?",
        "answers" => ["Berlin", "Madrid", "Paris", "Lisbon"],
        "correct" => "Paris"
    ],
    [
        "question" => "What is 2 + 2?",
        "answers" => ["3", "4", "5", "6"],
        "correct" => "4"
    ],
    // Add more questions here...
];

// Check if quiz progress (current question) is initialized
if (!isset($_SESSION['question_index'])) {
    $_SESSION['question_index'] = 0;  // Start from the first question
    $_SESSION['score'] = 0;            // Initialize score to 0
}

// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the current question index and user's answer
    $current_question = $_SESSION['question_index'];
    $selected_answer = $_POST['answer'] ?? '';

    // Check if the answer is correct and update the score
    if ($selected_answer === $questions[$current_question]['correct']) {
        $_SESSION['score']++;
    }

    // Move to the next question
    $_SESSION['question_index']++;

    // Check if the quiz is complete
    if ($_SESSION['question_index'] >= count($questions)) {
        // Quiz is complete, save the score to the database
        $user_id = $_SESSION['user_id']; // Assuming user ID is stored in session after login
        $score = $_SESSION['score'];
        
        // Insert the score into the database
        $sql = "INSERT INTO scores (user_id, scores) VALUES ($user_id, $score)";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Your score: $score", "quiz_complete" => true]);
            session_destroy();
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
        }
    } else {
        $question = $questions[$_SESSION['question_index']];
        echo json_encode(["status" => "success", "question" => $question]);
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
<h3>Question <?php echo $_SESSION['question_index'] + 1; ?> of <?php echo count($questions); ?></h3>

<form method="POST" action="quiz.php">
    <p><?php echo $questions[$_SESSION['question_index']]['question']; ?></p>
    
    <?php foreach ($questions[$_SESSION['question_index']]['answers'] as $answer): ?>
        <input type="radio" name="answer" value="<?php echo $answer; ?>" required> <?php echo $answer; ?><br>
    <?php endforeach; ?>
    
    <button type="submit">Next Question</button>
</form>
</body>
</html>


