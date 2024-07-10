const supabase = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

// Path to the dictionary file
const dictionaryFilePath = path.join(__dirname, '..', '..', 'client', 'assets', 'dictionary.json');

// Function to get the current word of the day from Supabase
exports.getWordOfTheDay = async () => {
    try {
        const { data, error } = await supabase
            .from('word_of_the_day')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        // If no word of the day is found, select a random word from the dictionary
        if (error && error.code === 'PGRST116') {
            const randomWord = await exports.selectRandomWord();
            await exports.addWordOfTheDay(randomWord);
            return randomWord;
        } else if (error) {
            throw new Error('Failed to fetch word of the day');
        }

        return data;
    } catch (err) {
        throw err;
    }
};

// Function to add a new word of the day to Supabase
exports.addWordOfTheDay = async (wordData) => {
    if (!wordData || typeof wordData !== 'object') {
        throw new Error('Invalid word data');
    }

    try {
        const { data, error } = await supabase
            .from('word_of_the_day')
            .insert([wordData]);

        if (error) {
            throw new Error('Failed to add word of the day');
        }

        return data;
    } catch (err) {
        throw err;
    }
};

// Function to select a random word from the dictionary file
exports.selectRandomWord = async () => {
    try {
        const data = await fs.readFile(dictionaryFilePath, 'utf8');
        const dictionary = JSON.parse(data);

        if (!Array.isArray(dictionary.message.words) || dictionary.message.words.length === 0) {
            throw new Error('Dictionary is empty or not an array');
        }

        const randomIndex = Math.floor(Math.random() * dictionary.message.words.length);
        const randomWord = dictionary.message.words[randomIndex];
        return randomWord;
    } catch (err) {
        throw err;
    }
};

// Function to update the word of the day in Supabase
exports.updateWordOfTheDay = async () => {
    try {
        const randomWord = await exports.selectRandomWord();
        await exports.deletePreviousWords();
        await exports.addWordOfTheDay(randomWord);
    } catch (err) {
        throw err;
    }
};

// Function to delete all previous words of the day from Supabase
exports.deletePreviousWords = async () => {
    try {
        const { error } = await supabase
            .from('word_of_the_day')
            .delete()
            .neq('id', -1); // Delete all rows

        if (error) {
            throw new Error('Failed to delete previous words');
        }
    } catch (err) {
        throw err;
    }
};
