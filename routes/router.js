const express = require('express');
const route = express.Router();
const { v4: uuid } = require('uuid');
const fileMulter = require('../middleware/updateFile');
const path = require('path');

class Book {
  constructor(title = '', description = '', authors = '', favorite = Boolean(), fileCover = '', fileName = '', fileBook = '', id = uuid()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  };
};

const data = {
  many: [
    new Book("Война и мир", "Роман-эпопея о войне 1812 года", "Лев Толстой", true,            "monkey1.jpg",  "Война и мир", "text1.pdf"),
    new Book("1984", "Антиутопический роман о тоталитарном обществе", "Джордж Оруэлл", false, "monkey2.jpg",  "1984",        "text2.pdf"),
    new Book("Гарри Поттер и философский камень", "Приключение", "Джоан Роулинг", true,       "monkey3.jpg",  "Гарри",       "text3.pdf"),
    new Book("Мастер и Маргарита", "Роман", "Михаил Булгаков", true,                          "monkey4.jpg",  "Мастер",      "text4.pdf")
  ]
};

// Статическая информация
route.post('/api/user/login', (req, res) => {
  res.json({id: 1, mail: 'test@mail.ru'});
});

// Получить все книги
route.get('/api/books', (req, res) => {
  const { many } = data;
  res.json(many);
});

// Получить книгу по ID
route.get('/api/books/:id', (req, res) => {
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
route.post('/api/books', (req, res) => {
  const { many } = data;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
  const newContent = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
  many.push(newContent);
  
  res.status(201).json(newContent);
});

// Загрузка книги по id 
route.post('/api/books/:id/upload',
  fileMulter.single('cover'),
  (req, res) => {
    const { many } = data;
    const { id } = req.params;
    const { path: filePath } = req.file;
    const idx = many.findIndex(el => el.id === id);
    if (idx != -1) {
      const fileName = path.basename(filePath);
      many[idx].fileBook = fileName;
      console.log(fileName);
      res.json({ path: fileName });
    } else {
      res.status(404).json('Not Found');
    };
  }
);

// Редактировать книгу по ID
route.put('/api/books/:id', (req, res) => {
  const { many } = data;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const { id } = req.params;
  const idx = many.findIndex(el => el.id === id);

  // Изменяем только те поля, которые хотим изменить, за filebook отвечает router.post('/api/books/:id/upload')
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

// Скачать книгу
route.get('/api/books/:id/download', (req, res) => {
  const { many } = data;
  const { id } = req.params;
  const idx = many.findIndex(el => el.id === id);

  if (idx !== -1) {
    let ext = path.extname(many[idx].fileBook);
    let pathFile = path.join(__dirname, '..', 'public', many[idx].fileBook);
    if (ext === '.txt') {
      pathFile = path.join(__dirname, '..', 'public', 'txt', many[idx].fileBook);
    } else if (ext === '.pdf') {
      pathFile = path.join(__dirname, '..', 'public', 'pdf', many[idx].fileBook);
    };
    res.download(pathFile);
  } else {
    res.status(404).json('Страница не найдена | 404');
  };
});

// Удалить книгу по ID
route.delete('/api/books/:id', (req, res) => {
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

module.exports = route;
