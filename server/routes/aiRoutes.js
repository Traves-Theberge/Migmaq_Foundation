const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.get('/fact', aiController.getFact);

module.exports = router;
