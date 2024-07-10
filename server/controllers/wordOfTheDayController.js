const wordOfTheDayService = require('../services/wordOfTheDayService');

// Controller to get the current word of the day
exports.getWordOfTheDay = async (req, res) => {
    try {
        const wordOfTheDay = await wordOfTheDayService.getWordOfTheDay();
        res.json(wordOfTheDay);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch word of the day' });
    }
};

// Controller to add a new word of the day
exports.addWordOfTheDay = async (req, res) => {
    try {
        const wordData = req.body;
        const newWord = await wordOfTheDayService.addWordOfTheDay(wordData);
        res.status(201).json(newWord);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add word of the day' });
    }
};

// Controller to update the word of the day
exports.updateWordOfTheDay = async (req, res) => {
    try {
        await wordOfTheDayService.updateWordOfTheDay();
        res.status(201).json({ message: 'Word of the Day updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update word of the day' });
    }
};
