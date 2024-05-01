const { Book, data } = require('./class_Book');
const path = require('path');
const axios = require('axios');

async function getAllBlocks() {
  return data.many;
};

async function getBookById(id) {
  return data.many.find(book => book.id === id);
};

async function createBook(bookData, file) {
  const existingBook = data.many.find(book => book.title === bookData.title);

  if (existingBook) {
    console.log('Книга с таким заголовком уже существует');
    return;
  };

  const newContent = new Book(
    bookData.title,
    bookData.description,
    bookData.authors,
    bookData.favorite,
    bookData.fileCover,
    bookData.fileName,
    file ? file.filename : bookData.fileBook,
  );

  data.many.push(newContent);
}

async function updateBook(bookData, body, file) {
  const { title, description, authors, favorite } = body;

  if (title) bookData.title = title;
  if (description) bookData.description = description;
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

async function sendReq(book) {
  try {
    const response = await axios.post(`http://counter:4000/counter/${book.title}`);
    console.log('Успешно отправлен POST-запрос.');
    console.log('Ответ:', response.data);
  } catch (error) {
    console.error("Ошибка при отправке POST");
  };
};

async function extractDate(arr) {
  try {
    const promises = arr.map(async (el) => {
      const response = await axios.get(`http://counter:4000/morecounter/${el.title}`);
      console.log("Ответ: ", response.data);
      el.count = response.data
      console.log(response);
      return el;
    });
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Ошибка где-то');
  };
}

module.exports = { getAllBlocks, getBookById, createBook, updateBook, downloadFile, deleteBlock, sendReq, extractDate };
