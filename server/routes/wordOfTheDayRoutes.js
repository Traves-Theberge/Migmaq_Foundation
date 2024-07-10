const express = require('express');
const router = express.Router();
const wordOfTheDayController = require('../controllers/wordOfTheDayController');

// Route to get the current word of the day
router.get('/word-of-the-day', wordOfTheDayController.getWordOfTheDay);

// Route to add a new word of the day
router.post('/word-of-the-day', wordOfTheDayController.addWordOfTheDay);

// Route to update the word of the day
router.put('/word-of-the-day/update', wordOfTheDayController.updateWordOfTheDay);

module.exports = router;
