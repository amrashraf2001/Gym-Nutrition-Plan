const sharp = require('sharp');
const fs = require('fs');
const imageToAVIF = async (req, res, next) => {
  // console.log(req.file);
  const { path } = req.file;  // Path of the uploaded file
  // console.log(path);
  if(path){
  try {
    // Initialize sharp with the file path directly
    await sharp(path)
      .avif({ quality: 50 }) // Convert to AVIF with quality 50
      .toFile(path.replace(/\.\w+$/, '.avif')); // Replace the file extension with .avif
    fs.unlinkSync(path); // Delete the original file
    req.file.filename = req.file.filename.replace(/\.\w+$/, '.avif'); // Update the filename to the new AVIF file
    next();
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the next middleware
  }
}
};

module.exports = imageToAVIF;
