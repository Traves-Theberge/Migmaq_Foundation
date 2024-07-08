const express = require('express');
const router = express.Router();
const dictionaryController = require('../controllers/dictionaryController');

router.get('/dictionary', dictionaryController.getDictionary);
router.get('/word-details', dictionaryController.getWordDetails);

module.exports = router;
