const fs = require('fs').promises;
const path = require('path');

const dictionaryFilePath = path.join(__dirname, '..', '..', 'client', 'assets', 'dictionary.json');

// Function to get the full dictionary
exports.getDictionary = async () => {
    try {
        const data = await fs.readFile(dictionaryFilePath, 'utf8'); // Read the dictionary file
        const parsedData = JSON.parse(data); // Parse the JSON data
        return parsedData.message.words; // Return the words from the parsed data
    } catch (error) {
        console.error('Error reading dictionary file:', error);
        throw new Error('Error reading dictionary file'); // Throw an error if reading fails
    }
};

// Function to get details of a specific word
exports.getWordDetails = async (word) => {
    try {
        const data = await fs.readFile(dictionaryFilePath, 'utf8'); // Read the dictionary file
        const dictionary = JSON.parse(data).message.words; // Parse the JSON data
        const wordDetails = dictionary.find(item => item.word === word); // Find the word details
        if (!wordDetails) throw new Error('Word not found');
        return wordDetails; // Return the word details
    } catch (error) {
        console.error('Error reading dictionary file:', error);
        throw new Error('Error reading dictionary file'); // Throw an error if reading fails
    }
};
