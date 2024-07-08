const fs = require('fs').promises;
const path = require('path');

const dictionaryFilePath = path.join(__dirname, '..', '..', 'client', 'assets', 'dictionary.json');

exports.getDictionary = async () => {
    try {
        const data = await fs.readFile(dictionaryFilePath, 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData.message.words;
    } catch (error) {
        console.error('Error reading dictionary file:', error);
        throw new Error('Error reading dictionary file');
    }
};

exports.getWordDetails = async (word) => {
    try {
        const data = await fs.readFile(dictionaryFilePath, 'utf8');
        const dictionary = JSON.parse(data).message.words;
        const wordDetails = dictionary.find(item => item.word === word);
        if (!wordDetails) throw new Error('Word not found');
        return wordDetails;
    } catch (error) {
        console.error('Error reading dictionary file:', error);
        throw new Error('Error reading dictionary file');
    }
};
