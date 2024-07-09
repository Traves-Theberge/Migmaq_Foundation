const commentsService = require('../services/commentsService');

exports.getComments = async (req, res) => {
    const { word_id } = req.query;
    if (!word_id) {
        return res.status(400).json({ error: 'word_id is required' });
    }
    try {
        const comments = await commentsService.getComments(word_id);
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

exports.addComment = async (req, res) => {
    const { word_id, parent_id, name, email, content } = req.body;
    if (!word_id || !name || !email || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const newComment = await commentsService.addComment({ word_id, parent_id, name, email, content });
        res.json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
};