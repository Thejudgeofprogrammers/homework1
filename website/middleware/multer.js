const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

function dynamicDestination(req, file, cb) {
  const dynamicPath = path.join(__dirname, '..', 'public');
  cb(null, dynamicPath);
}

const storage = multer.diskStorage({
  destination: dynamicDestination,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const safeName = Buffer.from(baseName, 'utf8').toString('utf8');
    cb(null, `${safeName}-${Date.now()}${ext}`);
  }
});

module.exports = multer({ storage });