const wordOfTheDayService = require('../services/wordOfTheDayService');

exports.getWordOfTheDay = async (req, res) => {
    try {
        const wordOfTheDay = await wordOfTheDayService.getWordOfTheDay();
        res.json(wordOfTheDay);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch word of the day' });
    }
};
