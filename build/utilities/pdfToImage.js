"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var path = require('path');

var joinImages = require('join-images');

var pdfToPng = require('pdf-to-png-converter');

var convertPDFToImage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (filePath) {
    var deleteAfterConvert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    try {
      var timestamp = Date.now();
      var newDir = path.join(__dirname, "../../uploads/svgs/".concat(timestamp));
      var imgDir = path.join(__dirname, "../../uploads/svgs");
      var newImageName = "conversion_pdf_png_".concat(timestamp, ".png");

      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, {
          recursive: true
        });
      }

      yield pdfToPng.pdfToPng(filePath, {
        disableFontFace: true,
        useSystemFonts: true,
        viewportScale: 3.0,
        outputFilesFolder: newDir
      });
      fs.readdir(newDir, /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (err, files) {
          //handling error
          if (err) {
            console.error('Unable to scan directory: ' + err);
            return false;
          }

          var filesToUse = files.map(f => path.join(newDir, f));
          yield joinImages.joinImages(filesToUse, {
            direction: 'vertical'
          }).then(img => {
            // Save image as file
            img.toFile(path.join(imgDir, newImageName));
          }).then(() => {
            // Delete the folder that had the images
            fs.rmSync(newDir, {
              recursive: true,
              force: true
            }); // Delete the old pdf too

            if (deleteAfterConvert) {
              fs.unlinkSync(filePath);
            }
          });
        });

        return function (_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }());
      var newImagePath = "uploads/svgs/".concat(newImageName);
      return newImagePath;
    } catch (error) {
      console.error('Error while converting pdf to png', error);
    }
  });

  return function convertPDFToImage(_x) {
    return _ref.apply(this, arguments);
  };
}();

var converter = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (pdf, deleteAfterConvert) {
    var errMsg = 'An error occurred while trying to convert pdf to base64';

    try {
      var res = yield convertPDFToImage(pdf, deleteAfterConvert);
      return res;
    } catch (error) {
      console.error(errMsg, ': ', error);
      return false;
    }
  });

  return function converter(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = converter;
//# sourceMappingURL=pdfToImage.js.map