let currentQuestionIndex = 0; // To keep track of the current question
let score = 0; // To keep track of the user's score

// Load the question from the server
function loadQuestion() {
    fetch('quiz.php', {
        method: 'POST',
        body: new URLSearchParams({ 'action': 'get_question', 'index': currentQuestionIndex }) // Send the current question index to get the corresponding question
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const question = data.question;
            document.getElementById('question').innerText = question.question;
            
            const answersHtml = question.answers.map((answer, index) => `
                <input type="radio" name="answer" value="${answer}" id="answer${index}">
                <label for="answer${index}">${answer}</label><br>
            `).join('');
            
            document.getElementById('answers').innerHTML = answersHtml;
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Handle form submission when the user submits an answer
document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const selectedAnswer = document.querySelector('input[name="answer"]:checked')?.value;

    if (!selectedAnswer) {
        alert("Please select an answer!");
        return;
    }

    // Send the selected answer to the server to check if it's correct
    fetch('quiz.php', {
        method: 'POST',
        body: new URLSearchParams({ 'action': 'submit_answer', 'answer': selectedAnswer })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            if (data.quiz_complete) {
                alert('Quiz complete! Your score: ' + data.message);
                window.location.href = 'results.html'; // Redirect to results page
            } else {
                currentQuestionIndex++; // Increment question index
                loadQuestion(); // Load the next question
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Initial call to load the first question
loadQuestion();
