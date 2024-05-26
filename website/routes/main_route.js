const express = require('express');
const path = require('path');
const bookService = require('./dir_router/optimize');
const fileMulter = require('../middleware/multer');
const Book = require('../models/books');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

const route = express.Router();

route.get('/', authenticate, async (req, res) => {
  try {
    const booksWithoutCounter = await Book.find({ owner: req.user._id }).select('-__v');
    const books = await bookService.extractDate(booksWithoutCounter);
    res.render('books/index', { title: 'Book', books });
  } catch (err) {
    console.error('Тут что угодно может пойти не так, Redis mongo', err);
  };
});

route.get('/get/:id', authenticate, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).select('-__v');
    await bookService.sendReq(book);
    
    if (!book) res.redirect('/404');

    if (book.owner.toString() !== req.user._id.toString()) {
      return res.status(403).send('Доступ запрещен. Эта книга не принадлежит вам.');
    };

    res.render('books/view', { title: "Book | view", book });
  } catch (err) {
    console.error('Тут не найдена книга по id, либо redis либо mongo', err);
  };
});

route.get('/create', (req, res) => {
  res.render('books/create', {
    title: 'Book | create',
    book: {
      title: '',
      description: '',
      authors: '',
      favorite: false,
      fileName: "",
      fileCover: ""
    }
  });
});
//authenticate
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
  }
});

route.get('/update/:id', authenticate, async (req, res) => {
  const book = await Book.findById(req.params.id).select('-__v');
  if (!book) res.redirect('/404');
  res.render('books/update', { title: 'book | update', book });
});

route.post('/update/:id', authenticate, fileMulter.single('cover'), async (req, res) => {
  try {
    const favorite = req.body.favorite === 'on';
    let pathFile;

    if (req.file) {
      pathFile = req.file.filename;
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
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-__v');

    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }

    res.redirect('/api/books');
  } catch (err) {
    console.error("ERROR UPDATE", err);
    res.status(500).send('Internal Server Error');
  }
});

route.get('/download/:id', authenticate, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const { fileCover } = book;
    const lastPath = path.join(__dirname, '..', 'public', fileCover);
    res.download(lastPath, book.fileName, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  } catch (err) {
    console.error('Error downloading file:', err);
    res.status(500).send('Error downloading file');
  }
});

route.post('/delete/:id', authenticate, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id).select('-__v');
    await bookService.deleteRedisKeyValue(req.params.id)
    res.redirect('/api/books');
  } catch (err) {
    console.error('Ошибка удаления', err);
  };
});

module.exports = route;
