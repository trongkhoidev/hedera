const express = require('express');
const router = express.Router();
const identityController = require('../controllers/identityRegistry');

router.post('/create', identityController.createIdentity);
router.post('/update-level', identityController.updateIdentityLevel);

module.exports = router;