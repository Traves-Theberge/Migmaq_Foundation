const fs = require('fs').promises;
const path = require('path');

const wordOfTheDayFilePath = path.join(__dirname, '..', '..', 'client', 'assets', 'wordOfTheDay.json');

exports.getWordOfTheDay = async () => {
    const data = await fs.readFile(wordOfTheDayFilePath, 'utf8');
    return JSON.parse(data);
};
