const dictionaryService = require('../services/dictionaryService'); // Import the dictionary service

// Controller function to get the dictionary
exports.getDictionary = async (req, res) => {
    try {
        const dictionary = await dictionaryService.getDictionary(); // Fetch the dictionary from the service
        res.json(dictionary); // Respond with the dictionary in JSON format
    } catch (error) {
        console.error('Error fetching dictionary data:', error); // Log any errors
        res.status(500).json({ error: 'Failed to fetch dictionary data' }); // Respond with an error message
    }
};

// Controller function to get details of a specific word
exports.getWordDetails = async (req, res) => {
    const { word } = req.query; // Get the 'word' query parameter from the request
    try {
        const wordDetails = await dictionaryService.getWordDetails(word); // Fetch the word details from the service
        res.json(wordDetails); // Respond with the word details in JSON format
    } catch (error) {
        console.error('Error fetching word details:', error); // Log any errors
        res.status(500).json({ error: 'Failed to fetch word details' }); // Respond with an error message
    }
};
