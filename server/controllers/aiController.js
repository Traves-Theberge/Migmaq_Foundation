const aiService = require('../services/aiService'); // Import the AI service

// Controller function to get an AI-generated fact
exports.getFact = async (req, res) => {
    const { word } = req.query; // Get the 'word' query parameter from the request
    try {
        const fact = await aiService.getFact(word); // Fetch the AI-generated fact from the service
        res.json({ fact }); // Respond with the fact in JSON format
    } catch (error) {
        console.error('Error fetching AI fact:', error); // Log any errors
        res.status(500).json({ error: 'Failed to fetch AI fact' }); // Respond with an error message
    }
};
