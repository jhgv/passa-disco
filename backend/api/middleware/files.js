const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/cover/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

module.exports.upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 2014 * 5 // 5mb
  }
});
