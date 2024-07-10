const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Define the route to fetch interesting facts
router.get('/fact', aiController.getFact);

module.exports = router;
