const axios = require('axios');

async function deleteRedisKeyValue(id) {
  try {
    await axios.post(`http://counter:4000/counter/delete/${id}`);
  } catch (err) {
    console.error("Ошибка удаления ключа Redis POST", err);
  };
};

async function sendReq(book) {
  try {
    await axios.post(`http://counter:4000/counter/${book._id}`);
  } catch (error) {
    console.error("Ошибка при отправке POST");
  };
};

async function extractDate(arr) {
  try {
    const promises = arr.map(async (books) => {
      const response = await axios.get(`http://counter:4000/morecounter/${books._id}`);
      books.count = response.data
      return books;
    });
    return await Promise.all(promises);
  } catch (err) {
    console.error("Ошибка запроса на главной странице");
  };
};

async function addBookToUser(userId, bookData) {
  try {
    const book = new Book(bookData);
    await book.save();

    const user = await User.findById(userId);
    user.books.push(book._id);
    await user.save();

    console.log('Книга добавлена пользователю:', user);
  } catch (error) {
    console.error('Ошибка при добавлении книги:', error);
  }
};

module.exports = {
  deleteRedisKeyValue,
  sendReq,
  extractDate,
  addBookToUser
};
