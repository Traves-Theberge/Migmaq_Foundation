const aiService = require('../services/aiService');

exports.getFact = async (req, res) => {
    const { word } = req.query;
    try {
        const fact = await aiService.getFact(word);
        res.json({ fact });
    } catch (error) {
        console.error('Error fetching AI fact:', error);
        res.status(500).json({ error: 'Failed to fetch AI fact' });
    }
};
