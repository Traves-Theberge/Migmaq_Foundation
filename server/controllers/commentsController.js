const commentsService = require('../services/commentsService');

exports.getComments = async (req, res) => {
    const { word_id } = req.query;
    try {
        const comments = await commentsService.getComments(word_id);
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

exports.addComment = async (req, res) => {
    const comment = req.body;
    try {
        const newComment = await commentsService.addComment(comment);
        res.json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
};
