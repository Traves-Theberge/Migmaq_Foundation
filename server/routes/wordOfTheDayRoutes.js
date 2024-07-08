const express = require('express');
const router = express.Router();
const wordOfTheDayController = require('../controllers/wordOfTheDayController');

router.get('/word-of-the-day', wordOfTheDayController.getWordOfTheDay);

module.exports = router;
