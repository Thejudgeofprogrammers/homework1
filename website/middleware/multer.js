const multer = require('multer');
const path = require('path');

function dynamicDestination(req, file, cb) {
  const dynamicPath = path.join(__dirname, '..', 'public');
  cb(null, dynamicPath);
};

const storage = multer.diskStorage({
  destination: dynamicDestination,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
    cb(null, `${file.originalname}-${Date.now()}${ext}`);
  }
});

module.exports = multer({ storage });