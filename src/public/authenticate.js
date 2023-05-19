
document.addEventListener('DOMContentLoaded', () => {

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const data = {
    username: username,
    password: password,
  }
  console.log(data);
  console.log("sent: ", JSON.stringify(data));
  console.log('clicked');

    const response = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      // Login successful, redirect to another page
      window.location.href = '/gossip';
    } else {
      // Display error message
      const errorMessage = await response.text();
      alert(errorMessage);
    }
  });
});
