"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pdfToImage = require('../utilities/pdfToImage');

var path = require('path');

var fs = require('fs');

var convertData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var fileReceived = req.file;

      if (fileReceived && fileReceived.path) {
        fileReceived = '../../' + fileReceived.path;
      }

      if (!fileReceived) {
        return res.status(400).json({
          message: 'No file received',
          success: false
        });
      }

      var filePath = path.join(__dirname, fileReceived);
      var fileRes = yield pdfToImage(filePath, true);

      if (fileRes && typeof fileRes === 'string') {
        var outputPath = path.join(__dirname, '../../' + fileRes); // Wait for fs to recognize file then send it.

        var returnInfo = setInterval( /*#__PURE__*/_asyncToGenerator(function* () {
          if (fs.existsSync(outputPath)) {
            yield res.sendFile(outputPath); // fs.unlinkSync(outputPath);

            clearInterval(returnInfo);
          }
        }), 300);
      } else {
        res.status(500).json({
          message: 'Something went wrong!',
          success: false
        });
      }
    } catch (error) {
      console.error('\nError while converting pdf: '.red, error);
      res.status(500).json({
        message: 'Something went wrong while converting your pdf!',
        success: false
      });
    }
  });

  return function convertData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var test = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      res.status(200).json({
        message: 'Great!'
      });
    } catch (error) {
      console.error('Error', error);
    }
  });

  return function test(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  convertData,
  test
};
//# sourceMappingURL=converterController.js.map