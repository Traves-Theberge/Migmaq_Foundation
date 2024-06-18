const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.static('public'));

const dictionaryFilePath = path.join(__dirname, 'public', 'dictionary.json');

// Helper function for case-insensitive search
function caseInsensitiveIncludes(source, searchTerm) {
    if (typeof source === 'string' && typeof searchTerm === 'string') {
        return source.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
}

app.get('/dictionary', (req, res) => {
    const searchTerm = req.query.term.toLowerCase();
    const filter = req.query.filter.toLowerCase();

    fs.readFile(dictionaryFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading dictionary file:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            const dictionaryData = JSON.parse(data);
            let filteredWords = [];

            // Filter based on selected filter (word, type, definitions, translations)
            if (filter === 'word') {
                filteredWords = dictionaryData.message.words.filter(word => caseInsensitiveIncludes(word.word, searchTerm));
            } else if (filter === 'type') {
                filteredWords = dictionaryData.message.words.filter(word => caseInsensitiveIncludes(word.type, searchTerm));
            } else if (filter === 'definitions') {
                filteredWords = dictionaryData.message.words.filter(word =>
                    word.definitions.some(def => caseInsensitiveIncludes(def, searchTerm))
                );
            } else if (filter === 'translations') {
                filteredWords = dictionaryData.message.words.filter(word =>
                    word.translations.some(trans => caseInsensitiveIncludes(trans, searchTerm))
                );
            } else {
                // Handle other filters or default behavior
                filteredWords = dictionaryData.message.words;
            }

            res.json({ words: filteredWords });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});


