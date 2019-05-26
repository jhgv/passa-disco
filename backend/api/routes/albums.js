const express = require('express');
const router = express.Router();

const albumControllers = require('../controllers/albums');
const constants = require('../utils/constants');
// multer middleware for request with files
const files = require('../middleware/files');

router.get('/', albumControllers.getAlbums);
router.get('/:id', albumControllers.getAlbum);
router.post(
  '/',
  files.upload.single(constants.COVER_IMAGE_FIELD),
  albumControllers.createAlbum
);
router.patch(
  '/:id',
  files.upload.single(constants.COVER_IMAGE_FIELD),
  albumControllers.editAlbum
);
router.delete('/:id', albumControllers.deleteAlbum);

module.exports = router;
