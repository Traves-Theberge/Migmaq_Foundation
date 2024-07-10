const express = require('express'); // Import the express module
const router = express.Router(); // Create a new router object
const aiController = require('../controllers/aiController'); // Import the AI controller

// Define a route to get an AI-generated fact
router.get('/fact', aiController.getFact);

module.exports = router; // Export the router
