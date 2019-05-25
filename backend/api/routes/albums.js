const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/cover/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {
    // 5mb
    fileSize: 1024 * 2014 * 5
  }
});

const albumControllers = require('../controllers/albums');

router.get('/', albumControllers.getAlbums);
router.get('/:id', albumControllers.getAlbum);
router.post('/', upload.single('cover_image'), albumControllers.createAlbum);
router.patch('/:id', upload.single('cover_image'), albumControllers.editAlbum);
router.delete('/:id', albumControllers.deleteAlbum);

module.exports = router;