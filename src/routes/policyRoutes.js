const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyEngine');

router.post('/create', policyController.createPolicy);
router.post('/update', policyController.updatePolicy);

module.exports = router;