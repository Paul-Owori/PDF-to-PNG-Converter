const fs = require('fs');
const path = require('path');
const joinImages = require('join-images');
const pdfToPng = require('pdf-to-png-converter');

const convertPDFToImage = async (filePath, deleteAfterConvert = true) => {
  try {
    const timestamp = Date.now();
    const newDir = path.join(__dirname, `../../uploads/svgs/${timestamp}`);
    const imgDir = path.join(__dirname, `../../uploads/svgs`);
    const newImageName = `conversion_pdf_png_${timestamp}.png`;

    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
    }

    await pdfToPng.pdfToPng(filePath, {
      disableFontFace: true,
      useSystemFonts: true,
      viewportScale: 3.0,
      outputFilesFolder: newDir,
    });

    fs.readdir(newDir, async function (err, files) {
      //handling error
      if (err) {
        console.error('Unable to scan directory: ' + err);
        return false;
      }

      const filesToUse = files.map((f) => path.join(newDir, f));

      await joinImages
        .joinImages(filesToUse, {
          direction: 'vertical',
        })
        .then((img) => {
          // Save image as file
          img.toFile(path.join(imgDir, newImageName));
        })
        .then(() => {
          // Delete the folder that had the images
          fs.rmSync(newDir, { recursive: true, force: true });
          // Delete the old pdf too
          if (deleteAfterConvert) {
            fs.unlinkSync(filePath);
          }
        });
    });

    const newImagePath = `uploads/svgs/${newImageName}`;
    return newImagePath;
  } catch (error) {
    console.error('Error while converting pdf to png', error);
  }
};

const converter = async (pdf, deleteAfterConvert) => {
  const errMsg = 'An error occurred while trying to convert pdf to base64';
  try {
    const res = await convertPDFToImage(pdf, deleteAfterConvert);

    return res;
  } catch (error) {
    console.error(errMsg, ': ', error);
    return false;
  }
};

module.exports = converter;
