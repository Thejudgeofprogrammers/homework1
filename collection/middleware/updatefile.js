// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// function dynamicDestination(req, file, cb) {
//   let dynamicPath = path.join(__dirname, '..', 'public');
//   if (!fs.existsSync(dynamicPath)) {
//     fs.mkdirSync(dynamicPath, { recursive: true });
//   }
  
//   cb(null, dynamicPath);
// };

// const storage = multer.diskStorage({
//   destination: dynamicDestination,
//   filename(req, file, cb) {
//     try {
//       const { _id } = req.params;
//       const originalFileName = path.basename(file.originalname, path.extname(file.originalname));
//       const ext = path.extname(file.originalname);
//       const timeStamp = Date.now();
//       cb(null, `${_id}${ext}`);
//     } catch (error) {
//       cb(error);
//     };
//   }
// });

// module.exports = multer({ storage });
