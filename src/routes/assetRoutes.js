const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

router.post('/create', assetController.createAsset);
router.post('/update', assetController.updateAsset);
router.post('/close', assetController.closeAsset);

module.exports = router;