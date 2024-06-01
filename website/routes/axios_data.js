const axios = require('axios');

// Удаление ключа redis при удалении книги
async function deleteRedisKeyValue(id) {
  try {
    await axios.post(`http://counter:4000/counter/delete/${id}`);
  } catch (err) {
    console.error("Ошибка удаления ключа Redis POST", err);
  };
};

// Увеличение счётчика redis при просмотре книги
async function sendReq(book) {
  try {
    await axios.post(`http://counter:4000/counter/${book._id}`);
  } catch (error) {
    console.error("Ошибка при отправке POST");
  };
};

// Извлечение данных счётчиков для всех книг в списке
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

module.exports = {
  deleteRedisKeyValue,
  sendReq,
  extractDate
};
