const aiService = require('../services/aiService');

// Controller method to handle the request for generating a fact
exports.getFact = async (req, res) => {
    try {
        // Retrieve query parameters from the request
        const { word, type, translations, definitions } = req.query;

        // Call the service method to generate the fact
        const fact = await aiService.generateFact({ word, type, translations, definitions });

        // Send the generated fact in the response
        res.json({ word, type, translations, definitions, fact });
    } catch (error) {
        console.error('Error generating fact:', error);
        res.status(500).json({ error: 'Failed to generate fact' });
    }
};
