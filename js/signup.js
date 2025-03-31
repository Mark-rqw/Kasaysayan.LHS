document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('signup.php', {
        method: 'POST',
        body: new URLSearchParams({
            'username': username,
            'password': password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
