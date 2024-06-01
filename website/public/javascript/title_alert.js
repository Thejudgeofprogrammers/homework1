// Проверка на то, что title пустой
document.getElementById('bookForm').addEventListener('submit', function(event) {
  const title = document.querySelector('input[name="title"]').value;
  if (title.length === 0) {
    alert('Поле title не может быть пустым');
    event.preventDefault();
  };
});