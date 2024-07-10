const fs = require('fs').promises;
const path = require('path');

const wordOfTheDayFilePath = path.join(__dirname, '..', '..', 'client', 'assets', 'wordOfTheDay.json');

// Function to get the word of the day
exports.getWordOfTheDay = async () => {
    const data = await fs.readFile(wordOfTheDayFilePath, 'utf8'); // Read the word of the day file
    return JSON.parse(data); // Parse and return the JSON data
};
