// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');

// function dynamicDestination(req, file, cb) {
//   const formData = new FormData();
//   const fileStream = fs.createReadStream(file.path);
  
//   formData.append('file', fileStream, file.originalname);
//   axios.post('http://collection:5001/upload', formData, {
//     headers: formData.getHeaders()
//   })
//   .then(response => {
//     console.log(response.data);
//     cb(null, 'public');
//   })
//   .catch(error => {
//     console.error('Ошибка при загрузке файла:', error);
//     cb(error, null);
//   });
// };

// module.exports = dynamicDestination;
