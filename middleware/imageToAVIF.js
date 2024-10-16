const sharp = require('sharp');
const fs = require('fs');

const imageToAVIF = async (req, res, next) => {
  // Check if file exists in the request
  if (req.file && req.file.path) {
    const { path } = req.file; // Path of the uploaded file

    try {
      // Initialize sharp with the file path directly
      await sharp(path)
        .avif({ quality: 50 }) // Convert to AVIF with quality 50
        .toFile(path.replace(/\.\w+$/, '.avif')); // Replace the file extension with .avif

      // Asynchronously delete the original file
      fs.unlink(path, (err) => {
        if (err) {
          console.error('Error deleting the original file:', err);
        }
      });

      // Update the filename to the new AVIF file
      req.file.filename = req.file.filename.replace(/\.\w+$/, '.avif');

      next(); // Move to the next middleware
    } catch (error) {
      console.error('Error processing image:', error);
      next(error); // Pass the error to the next middleware
    }
  } else {
    next(); // If no file is present, move to the next middleware
  }
};

module.exports = imageToAVIF;

