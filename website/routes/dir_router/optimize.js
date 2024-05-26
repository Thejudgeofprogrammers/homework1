const axios = require('axios');

// async function createSuffix(title, collection) {
//   if (!title || title.length === 0) return;
//   let suffix = 0;
//   let newTitle = title;
//   let existingBook = await collection.findOne({ title: newTitle });
//   while (existingBook) {
//     suffix++;
//     newTitle = `${title} _ ${suffix}`;
//     existingBook = await collection.findOne({ title: newTitle });
//   };
//   return newTitle;
// };

// async function uploadFileToServer(file, encodedFileName) {
//   const formData = new FormData();
//   const fileStream = fs.createReadStream(file.path);
//   formData.append('file', fileStream, encodedFileName);
//   try {
//     const response = await axios.post('http://collection:5001/upload', formData, {
//       headers: {
//         ...formData.getHeaders()
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Ошибка загрузки файла на сервер:', error);
//   };
// };


// async function downloadFile(id) {
//   console.log(id, 'File cover in downloadFile function');
//   try {
//     // Запрос на получение файла по ID
//     const response = await axios.get(`http://collection:5001/get/${id}`, {
//       responseType: 'stream',
//     });

//     const downloadPath = path.join(__dirname, '..', '..', '/downloads', id);
//     const writer = fs.createWriteStream(downloadPath);

//     response.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//       writer.on('finish', () => resolve(downloadPath));
//       writer.on('error', reject);
//     });
//   } catch (error) {
//     console.error('Ошибка при загрузке файла:', error);
//     throw error;
//   }
// };

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
