const { Book, data } = require('./class_Book');
const path = require('path');

async function getAllBlocks() {
  return data.many;
};

async function getBookById(id) {
  return data.many.find(book => book.id === id);
};

async function createBook(bookData, file) {
  const newContent = new Book (
    bookData.title, 
    bookData.description, 
    bookData.authors, 
    bookData.favorite, 
    bookData.fileCover, 
    bookData.fileName, 
    file ? file.filename : bookData.fileBook
  );
  data.many.push(newContent);
};

async function updateBook(bookData, body, file) {
  const { title, description, authors, favorite } = body;

  if (title) bookData.title = title;
  if (description)bookData.description = description;
  if (authors) bookData.authors = authors;
  if (favorite) bookData.favorite = favorite;
  if (file) bookData.fileBook = file.filename;
};

async function downloadFile(book) {
  let ext = path.extname(book.fileBook);
  let pathFile = path.join(__dirname, '..', '..', 'public');

  if (ext === '.txt' || ext === '.pdf') pathFile = path.join(__dirname, '..', '..', 'public', ext.slice(1), book.fileBook);
  
  return pathFile;
};

async function deleteBlock(id) {
  const bookIdx = data.many.findIndex(book => book.id == id);
  if (bookIdx !== -1) data.many.splice(bookIdx, 1);
};

module.exports = {getAllBlocks, getBookById, createBook, updateBook, downloadFile, deleteBlock};
