const sharp = require('sharp');
const fs = require('fs');

const imageToAVIF = async (req, res, next) => {
  if (req.file && req.file.path) {
    const { path } = req.file;

    try {
      // Convert image to AVIF
      await sharp(path)
        .avif({ quality: 50 })
        .toFile(path.replace(/\.\w+$/, '.avif'));

      // Add a slight delay before deleting the original file
      setTimeout(() => {
        fs.unlink(path, (err) => {
          if (err) {
            console.error('Error deleting the original file:', err);
          } else {
            console.log('Original file deleted successfully.');
          }
        });
      }, 1000); // 1-second delay

      // Update the filename to the new AVIF file
      req.file.filename = req.file.filename.replace(/\.\w+$/, '.avif');
      next();
    } catch (error) {
      console.error('Error processing image:', error);
      next(error);
    }
  } else {
    next();
  }
};

module.exports = imageToAVIF;
