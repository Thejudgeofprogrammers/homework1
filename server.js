const express = require('express');
const { v4: uuid } = require('uuid');
require('dotenv').config();

class Book {
  constructor(title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '', id = uuid()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  };
};

const data = {
  many: [
    new Book("Война и мир", "Роман-эпопея о войне 1812 года", "Лев Толстой", "Да", "voyna-i-mir.jpg", "voyna-i-mir.pdf"),
    new Book("1984", "Антиутопический роман о тоталитарном обществе", "Джордж Оруэлл", "Нет", "1984-cover.jpg", "1984.pdf"),
    new Book("Гарри Поттер и философский камень", "Приключение", "Джоан Роулинг", "Да", "harry-potter-cover.jpg", "harry-potter.pdf"),
    new Book("Мастер и Маргарита", "Роман", "Михаил Булгаков", "Да", "master-i-margarita-cover.jpg", "master-i-margarita.pdf")
  ]
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статическая информация
app.post('/api/user/login', (req, res) => {
  res.json({id: 1, mail: 'test@mail.ru'});
});

// Получить все книги
app.get('/api/books', (req, res) => {
  const { many } = data;
  res.json(many);
});

// Получить книгу по ID
app.get('/api/books/:id', (req, res) => {
  const { many } = data;
  const { id } = req.params;
  const idx = many.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.json(many[idx]);
  } else {
    res.status(404).json('Страница не найдена | 404');
  };
});

// Создать книгу
app.post('/api/books', (req, res) => {
  const { many } = data;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const newContent = new Book(title, description, authors, favorite, fileCover, fileName);
  many.push(newContent);
  
  res.status(201).json(newContent);
});

// Редактировать книгу по ID
app.put('/api/books/:id', (req, res) => {
  const { many } = data;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const { id } = req.params;
  const idx = many.findIndex(el => el.id === id);

  // Изменяем только те поля, которые хотим изменить
  if (idx !== -1) {

    if (title) many[idx].title = title;
    if (description) many[idx].description = description;
    if (authors) many[idx].authors = authors;
    if (favorite) many[idx].favorite = favorite;
    if (fileCover) many[idx].fileCover = fileCover;
    if (fileName) many[idx].fileName = fileName;

    res.json(many[idx]);
  } else {
    res.status(404).json('Запись не найдена | 404');
  };
});

// Удалить книгу по ID
app.delete('/api/books/:id', (req, res) => {
  const { many } = data;
  const { id } = req.params;
  const idx = many.findIndex(el => el.id === id);

  if (idx !== -1) {
    many.splice(idx, 1);
    res.send('ok');
  } else {
    res.status(404).json('Запись не найдена | 404');
  };
});

const PORT = process.env.PORT ?? 3030;

app.listen(PORT, () => {
  console.log(`Server is located in http://localhost:${PORT}`);
});
