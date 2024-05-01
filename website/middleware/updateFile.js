const multer = require('multer');
const path = require('path');

function dynamicDestination(req, file, cb) {
  let dynamicPath = 'public';
  if (file.mimetype === 'text/plain') {
    dynamicPath = 'public/txt';
  } else if (file.mimetype === 'application/pdf') {
    dynamicPath = 'public/pdf';
  };

  cb(null, dynamicPath);
};

const storage = multer.diskStorage({
  destination: dynamicDestination,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

module.exports = multer({ storage });
