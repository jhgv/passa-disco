const multer = require('multer');
const mkdirp = require('mkdirp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/cover/';
    mkdirp(dir, err => cb(null, dir));
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
