const fs = require('fs');
const Multer = require('multer');
const path = require('path');

const uploadDirRelative = 'uploads';
const uploadDir = path.join(__dirname, `../../${uploadDirRelative}`);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

let photoStorage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirRelative);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      'conversion_file' + '_' + Date.now() + path.extname(file.originalname),
    );
  },
});

var uploader = Multer({ storage: photoStorage });
module.exports = uploader;
