const dictionaryService = require('../services/dictionaryService');

exports.getDictionary = async (req, res) => {
    try {
        const dictionary = await dictionaryService.getDictionary();
        res.json(dictionary);
    } catch (error) {
        console.error('Error fetching dictionary data:', error);
        res.status(500).json({ error: 'Failed to fetch dictionary data' });
    }
};

exports.getWordDetails = async (req, res) => {
    const { word } = req.query;
    try {
        const wordDetails = await dictionaryService.getWordDetails(word);
        res.json(wordDetails);
    } catch (error) {
        console.error('Error fetching word details:', error);
        res.status(500).json({ error: 'Failed to fetch word details' });
    }
};
