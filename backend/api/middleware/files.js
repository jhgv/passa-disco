const multer = require('multer');
const mkdirp = require('mkdirp');

// Setting the destination and name for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/cover/';
    // Create a folder the uploads folder
    mkdirp(dir, err => cb(null, dir));
  },
  filename: (req, file, cb) => {
    // Formatting the file name to contain the ISO Date as prefix
    cb(null, new Date().toISOString() + file.originalname);
  }
});

module.exports.upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 2014 * 5 // 5mb
  }
});
