const express = require('express'); // Import the express module
const router = express.Router(); // Create a new router object
const wordOfTheDayController = require('../controllers/wordOfTheDayController'); // Import the Word of the Day controller

// Define a route to get the Word of the Day
router.get('/word-of-the-day', wordOfTheDayController.getWordOfTheDay);

module.exports = router; // Export the router
