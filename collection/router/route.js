// const express = require('express');
// const multerConfig = require('../middleware/updatefile');
// const path = require('path');
// const route = express.Router();

// route.post('/upload', multerConfig.single('file'), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('Файл не загружен');
//     };
//     res.send({ fileName: req.file.filename, message: 'Файл успешно загружен' });
//   } catch (err) {
//     console.error('Ошибка при загрузке файла:', err);
//     res.status(500).send('Ошибка при загрузке файла');
//   };
// });

// route.get('/get/:_id', (req, res) => {
//   const { _id } = req.params;
//   console.log(_id, 'File cover in second server');
//   const filePath = path.join(__dirname, '..', 'public', _id);

//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error('Ошибка при отправке файла:', err);
//       res.status(500).send('Ошибка при отправке файла');
//     }
//   });
// });

// route.delete('/files/:fileName', (req, res) => {

//   const { fileName } = req.params;
//   const filePath = path.join(__dirname, '..', 'public', fileName);

//   fs.unlink(filePath, err => {
//     if (err) {
//       console.error('Ошибка при удалении файла:', err);
//       return res.status(500).send('Ошибка при удалении файла');
//     }
//     res.send('Файл успешно удален');
//   });
// });

// module.exports = route;