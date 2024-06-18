const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001; // Use environment variable or port 3001

app.use(cors()); // Enable CORS for all routes
app.use(express.static('public')); // Serve static files from 'public' folder

const dictionaryFilePath = path.join(__dirname, 'public', 'dictionary.json');

// Helper function for case-insensitive search
function caseInsensitiveIncludes(source, searchTerm) {
    if (typeof source === 'string' && typeof searchTerm === 'string') {
        return source.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
}

app.get('/api/dictionary', (req, res) => {
    const searchTerm = req.query.term ? req.query.term.toLowerCase() : '';
    const filter = req.query.filter ? req.query.filter.toLowerCase() : '';

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
                filteredWords = dictionaryData.words.filter(word => caseInsensitiveIncludes(word.word, searchTerm));
            } else if (filter === 'type') {
                filteredWords = dictionaryData.words.filter(word => caseInsensitiveIncludes(word.type, searchTerm));
            } else if (filter === 'definitions') {
                filteredWords = dictionaryData.words.filter(word =>
                    word.definitions.some(def => caseInsensitiveIncludes(def, searchTerm))
                );
            } else if (filter === 'translations') {
                filteredWords = dictionaryData.words.filter(word =>
                    word.translations.some(trans => caseInsensitiveIncludes(trans, searchTerm))
                );
            } else {
                // Default to returning all words if no filter or invalid filter provided
                filteredWords = dictionaryData.words;
            }

            res.json({ words: filteredWords });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
