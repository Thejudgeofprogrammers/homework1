// Проверка на совпадение Логина и почты при создании аккаунта
document.getElementById('registryForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = {
      username: formData.get('username'),
      password: formData.get('password'),
      displayName: formData.get('displayName'),
      email: formData.get('email')
  };
  fetch('/api/users/registry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
      if (result.userExists) {
          alert('User already exists!');
      } else {
          window.location.href = '/api/users/login';
      };
  })
  .catch(error => {
      console.error('Error:', error);
  });
});