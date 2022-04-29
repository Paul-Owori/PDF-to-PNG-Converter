"use strict";

var fs = require('fs');

var Multer = require('multer');

var path = require('path');

var uploadDirRelative = 'uploads';
var uploadDir = path.join(__dirname, "../../".concat(uploadDirRelative));

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true
  });
}

var photoStorage = Multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, uploadDirRelative);
  },
  filename: function filename(req, file, cb) {
    cb(null, 'conversion_file' + '_' + Date.now() + path.extname(file.originalname));
  }
});
var uploader = Multer({
  storage: photoStorage
});
module.exports = uploader;
//# sourceMappingURL=saveImageLocally.js.map