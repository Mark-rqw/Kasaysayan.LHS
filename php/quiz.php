<?php
session_start();

$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "Kasaysayandb"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit;
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

// Handle AJAX requests (action)
$action = $_POST['action'] ?? '';

switch ($action) {
    case 'get_question':
        // Return the current question as JSON
        $index = $_POST['index'] ?? 0;
        if ($index < count($questions)) {
            echo json_encode([
                'status' => 'success',
                'question' => $questions[$index]
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'No more questions.'
            ]);
        }
        break;

    case 'submit_answer':
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
                echo json_encode([
                    "status" => "success", 
                    "message" => "Your score: $score", 
                    "quiz_complete" => true
                ]);
                session_destroy(); // Optionally destroy the session after quiz completion
            } else {
                echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
            }
        } else {
            $question = $questions[$_SESSION['question_index']];
            echo json_encode(["status" => "success", "question" => $question]);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
        break;
}

?>
