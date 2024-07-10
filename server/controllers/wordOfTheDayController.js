const wordOfTheDayService = require('../services/wordOfTheDayService'); // Import the Word of the Day service

// Controller function to get the Word of the Day
exports.getWordOfTheDay = async (req, res) => {
    try {
        const wordOfTheDay = await wordOfTheDayService.getWordOfTheDay(); // Fetch the Word of the Day from the service
        res.json(wordOfTheDay); // Respond with the Word of the Day in JSON format
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch word of the day' }); // Respond with an error message if fetching fails
    }
};
