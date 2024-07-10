const commentsService = require('../services/commentsService'); // Import the comments service

// Controller function to get comments
exports.getComments = async (req, res) => {
    const { word_id } = req.query; // Get the 'word_id' query parameter from the request
    if (!word_id) {
        return res.status(400).json({ error: 'word_id is required' }); // Respond with an error if 'word_id' is missing
    }
    try {
        const comments = await commentsService.getComments(word_id); // Fetch comments from the service
        res.json(comments); // Respond with the comments in JSON format
    } catch (error) {
        console.error('Error fetching comments:', error); // Log any errors
        res.status(500).json({ error: 'Failed to fetch comments' }); // Respond with an error message
    }
};

// Controller function to add a new comment
exports.addComment = async (req, res) => {
    const { word_id, parent_id, name, email, content } = req.body; // Get comment data from the request body
    if (!word_id || !name || !email || !content) {
        return res.status(400).json({ error: 'Missing required fields' }); // Respond with an error if any required fields are missing
    }
    try {
        const newComment = await commentsService.addComment({ word_id, parent_id, name, email, content }); // Add the new comment using the service
        res.json(newComment); // Respond with the new comment in JSON format
    } catch (error) {
        console.error('Error adding comment:', error); // Log any errors
        res.status(500).json({ error: 'Failed to add comment' }); // Respond with an error message
    }
};
