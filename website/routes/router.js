const express = require('express');

const { v4: uuid } = require('uuid');
const fileMulter = require('../middleware/updateFile');
const bookService = require('./dir_router/optimize');

const route = express.Router();

route.get('/', async (req, res) => { // Получить все книги
  const updatebooks = await bookService.getAllBlocks();
  const books = await bookService.extractDate(updatebooks);
  res.render('books/index', { title: 'Book', books });
});

route.get('/get/:id', async (req, res) => { // Получить книгу по Id
  const book = await bookService.getBookById(req.params.id);
  console.log('97854667894235678923598')
  await bookService.sendReq(book);
  if (!book) res.redirect('/404');
  res.render('books/view', { title: "Book | view", book });
});

route.get('/create', (req, res) => {
  res.render('books/create', {
    title: 'Book | create', book: {
      id: uuid(), title: '', description: '',
      authors: '', favorite: false, fileCover: '', fileName: '', fileBook: ''
    }
  });
});

route.post('/create', fileMulter.single('cover'), async (req, res) => {
  await bookService.createBook(req.body, req.file);
  res.redirect(`/api/books`);
});

route.get('/update/:id', async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  if (!book) res.redirect('/404');
  res.render('books/update', { title: 'book | update', book });
});

route.post('/update/:id', fileMulter.single('cover'), async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  if (!book) res.redirect('/404');
  await bookService.updateBook(book, req.body, req.file);
  res.redirect('/api/books');
});

route.get('/download/:id', fileMulter.single('cover'), async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  if (!book) res.redirect('/404');
  res.download(await bookService.downloadFile(book));
});

route.post('/delete/:id', async (req, res) => {
  await bookService.deleteBlock(req.params.id);
  res.redirect('/api/books');
});

module.exports = route;
