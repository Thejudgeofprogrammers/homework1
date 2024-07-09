const express = require('express');
const path = require('path');

// Функции redis axios
const bookService = require('./axios_data');

// Middleware
const { fileMulter, authenticate } = require('../middlewares');

// Models
const { Book, User, Comment } = require('../models');

// Объявление Route
const route = express.Router();

// Получение всех книг пользователя
route.get('/', authenticate, async (req, res) => {
  try {
    const booksWithoutCounter = await Book.find({ owner: req.user._id }).select('-__v');
    const books = await bookService.extractDate(booksWithoutCounter);
    res.render('books/index', { title: 'Book', currentPage: '/api/books', books });
  } catch (err) {
    console.error('Книги не найдены', err);
  };
});

// Получение книги по id
route.get('/get/:id', authenticate, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).select('-__v');
    await bookService.sendReq(book);

    if (!book) res.redirect('/404');

    if (book.owner.toString() !== req.user._id.toString() && !book.isPublished) {
      return res.status(403).send('Доступ запрещен. Эта книга не принадлежит вам.');
    }

    res.render('books/view', { title: "Book | view", currentPage: '/api/books/get/:id', book, dispName: req.user.displayName });
  } catch (err) {
    console.error('Книга по id не найдена', err);
  }
});

// Создание формы для новой книги
route.get('/create', authenticate, (req, res) => {
  res.render('books/create', {
    title: 'Book | create',
    book: {
      title: '',
      description: '',
      authors: '',
      favorite: false,
      fileName: "",
      fileCover: ""
    },
    currentPage: '/api/books/create'
  });
});

// Создание книги
route.post('/create', authenticate, fileMulter.single('cover'), async (req, res) => {
  try {
    const { title, description, authors, favorite } = req.body;
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Вы не вошли в аккаунт' })
    };

    let pathFile = '';
    let fileName = '';
    if (req.file) {
      fileName = req.file.originalname;
      pathFile = req.file.filename;
    };

    const bookData = {
      title,
      description,
      authors,
      favorite: favorite === 'on',
      fileName,
      fileCover: pathFile,
      owner: userId
    };

    const book = new Book(bookData);
    await book.save();

    const user = await User.findById(userId);
    user.books.push(book._id);
    await user.save();

    res.redirect(`/api/books`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при сохранении книги' });
  };
});

// Создание формы для обновления книги
route.get('/update/:id', authenticate, async (req, res) => {
  const book = await Book.findById(req.params.id).select('-__v');
  if (!book) res.redirect('/404');
  res.render('books/update', { title: 'book | update', currentPage: '/api/books/update/:id', book });
});

// Отправка внесённых именений в книгу
route.post('/update/:id', authenticate, fileMulter.single('cover'), async (req, res) => {
  try {
    const favorite = req.body.favorite === 'on';
    let pathFile;

    if (req.file) {
      pathFile = req.file.filename;
    };

    if (!req.body.title) {
      return res.redirect('/api/books');
    };

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      authors: req.body.authors,
      favorite: favorite
    };

    if (req.file) {
      updateData.fileName = req.file.originalname;
      updateData.fileCover = pathFile;
    };

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-__v');

    if (!updatedBook) {
      return res.status(404).send('Книга не найдена');
    };

    res.redirect('/api/books');
  } catch (err) {
    console.error("Ошибка обновления", err);
    res.status(500).send('Ошибка сервера');
  };
});

// Загрузка книги
route.get('/download/:id', authenticate, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const { fileCover, fileName } = book;
    const lastPath = path.join(__dirname, '..', '..', 'public', 'uploads', fileCover);

    res.download(lastPath, fileName, (err) => {
      if (err) {
        console.error('Ошибка скачивания', err);
        res.status(500).send('Ошибка скачивания');
      }
    });
  } catch (err) {
    console.error('Ошибка скачивания', err);
    res.status(500).send('Ошибка скачивания');
  }
});

// Удаление книги
route.post('/delete/:id', authenticate, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id).select('-__v');
    await Comment.deleteMany({ bookId: req.params.id });
    await bookService.deleteRedisKeyValue(req.params.id);
    res.redirect('/api/books');
  } catch (err) {
    console.error('Ошибка удаления', err);
  };
});

// Рендер страницы публикаций
route.get('/publish', async (req, res) => {
  try {
    const booksWithoutCounter = await Book.find({ isPublished: true }).select('-__v');
    const books = await bookService.extractDate(booksWithoutCounter);
    res.render('books/index', { title: 'Published Books', currentPage: '/api/books/publish', books });
  } catch (err) {
    console.error('Опубликованные книги не найдены', err);
  }
});

// Рендер страницы публикации книги по id
route.get('/publish/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).select('-__v');
    await bookService.sendReq(book);

    if (!book) return res.redirect('/404');

    if (!book.isPublished) {
      return res.status(403).send('Эта книга не опубликована.');
    };

    res.render('books/view', { title: "Published Book | View", currentPage: '/api/books/publish/:id', book, dispName: req.user.displayName });
  } catch (err) {
    console.error('Опубликованная книга по id не найдена', err);
  };
});

// Публикация книги для всех пользователей
route.post('/publish/:id', authenticate, async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) {
      console.error('Book not found');
      return res.status(404).send('Книга не найдена');
    };

    if (book.owner.toString() !== req.user._id.toString()) {
      console.error('Доступ запрещён');
      return res.status(403).send('Доступ запрещен. Эта книга не принадлежит вам.');
    };

    // Обновление статуса публикации
    book.isPublished = true;

    await book.save();

    // Проверка, что книга действительно была обновлена
    await Book.findById(bookId);

    res.redirect(`/api/books/publish`);
  } catch (err) {
    console.error('Error книга не опубликована', err);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = route;
