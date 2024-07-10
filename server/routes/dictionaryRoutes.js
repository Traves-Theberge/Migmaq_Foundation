const express = require('express'); // Import the express module
const router = express.Router(); // Create a new router object
const dictionaryController = require('../controllers/dictionaryController'); // Import the dictionary controller

// Define a route to get the dictionary
router.get('/dictionary', dictionaryController.getDictionary);

// Define a route to get details of a specific word
router.get('/word-details', dictionaryController.getWordDetails);

module.exports = router; // Export the router
