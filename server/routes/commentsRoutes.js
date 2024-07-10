const express = require('express'); // Import the express module
const router = express.Router(); // Create a new router object
const commentsController = require('../controllers/commentsController'); // Import the comments controller

// Define a route to get comments
router.get('/comments', commentsController.getComments);

// Define a route to add a new comment
router.post('/comments', commentsController.addComment);

module.exports = router; // Export the router
