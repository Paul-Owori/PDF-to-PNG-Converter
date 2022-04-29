const pdfToImage = require('../utilities/pdfToImage');
const path = require('path');
const fs = require('fs');

const convertData = async (req, res, next) => {
  try {
    let fileReceived = req.file;
    if (fileReceived && fileReceived.path) {
      fileReceived = '../../' + fileReceived.path;
    }

    if (!fileReceived) {
      return res.status(400).json({
        message: 'No file received',
        success: false,
      });
    }

    const filePath = path.join(__dirname, fileReceived);

    const fileRes = await pdfToImage(filePath, true);
    if (fileRes && typeof fileRes === 'string') {
      const outputPath = path.join(__dirname, '../../' + fileRes);

      // Wait for fs to recognize file then send it.
      const returnInfo = setInterval(async () => {
        if (fs.existsSync(outputPath)) {
          await res.sendFile(outputPath);

          // fs.unlinkSync(outputPath);
          clearInterval(returnInfo);
        }
      }, 300);
    } else {
      res.status(500).json({
        message: 'Something went wrong!',
        success: false,
      });
    }
  } catch (error) {
    console.error('\nError while converting pdf: '.red, error);

    res.status(500).json({
      message: 'Something went wrong while converting your pdf!',
      success: false,
    });
  }
};

const test = async (req, res, next) => {
  try {
    res.status(200).json({
      message: 'Great!',
    });
  } catch (error) {
    console.error('Error', error);
  }
};

module.exports = {
  convertData,
  test,
};
