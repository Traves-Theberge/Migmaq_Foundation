// server/services/games/gamesService.js
const fs = require('fs').promises;
const path = require('path');

// Path to the dictionary file
const dictionaryFilePath = path.join(__dirname, '..', '..', '..', 'client', 'assets', 'dictionary.json');

// Function to get random words from the dictionary
async function getRandomWords(count = 6) { // Adjust count as needed for pairs
    try {
        const data = await fs.readFile(dictionaryFilePath, 'utf8');
        const dictionary = JSON.parse(data);

        if (!Array.isArray(dictionary.message.words) || dictionary.message.words.length === 0) {
            throw new Error('Dictionary is empty or not an array');
        }

        // Shuffle the words and select the first 'count' words
        const shuffledWords = dictionary.message.words.sort(() => 0.5 - Math.random());
        const selectedWords = shuffledWords.slice(0, count);

        // Duplicate the words to create pairs and shuffle again
        const wordPairs = [...selectedWords, ...selectedWords].sort(() => 0.5 - Math.random());

        return wordPairs;
    } catch (error) {
        throw new Error('Error reading dictionary file');
    }
}

// Function to get game data based on the game type
exports.getGameData = async (gameType) => {
    switch (gameType) {
        case 'flashcard':
            return await getRandomWords();
        // Add cases for other game types here
        default:
            throw new Error('Invalid game type');
    }
};
