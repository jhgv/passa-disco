const express = require('express');
const router = express.Router();

const collectionControllers = require('../controllers/collection');

router.get('/', collectionControllers.getCollections);
router.get('/:id', collectionControllers.getCollection);
router.get('/:id/albums', collectionControllers.getCollectionAlbums);
router.post('/', collectionControllers.createCollection);
router.patch('/:id', collectionControllers.editCollection);
router.delete('/:id', collectionControllers.deleteCollection);

module.exports = router;
