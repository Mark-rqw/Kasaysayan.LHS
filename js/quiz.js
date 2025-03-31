let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    fetch('quiz.php', {
        method: 'POST',
        body: new URLSearchParams({ 'answer': '' }) // Empty answer for fetching the question
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

document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const selectedAnswer = document.querySelector('input[name="answer"]:checked')?.value;

    fetch('quiz.php', {
        method: 'POST',
        body: new URLSearchParams({ 'answer': selectedAnswer })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            if (data.quiz_complete) {
                alert('Quiz complete! Your score: ' + data.message);
                window.location.href = 'results.html'; // Redirect to results page
            } else {
                loadQuestion();
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

loadQuestion(); // Load the first question
