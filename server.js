const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

const dictionaryFilePath = path.join(__dirname, 'public', 'dictionary.json');

function caseInsensitiveIncludes(source, searchTerm) {
    return source.toLowerCase().includes(searchTerm.toLowerCase());
}

app.get('/api/dictionary', (req, res) => {
    const searchTerm = req.query.term ? req.query.term.toLowerCase() : '';
    const filter = req.query.filter ? req.query.filter.toLowerCase() : '';

    fs.readFile(dictionaryFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading dictionary file:', err);
            return res.status(500).json({ error: 'Internal server error: Failed to read dictionary file' });
        }

        try {
            const dictionaryData = JSON.parse(data);

            if (!dictionaryData || !dictionaryData.message || !Array.isArray(dictionaryData.message.words)) {
                return res.status(500).json({ error: 'Internal server error: Invalid dictionary format' });
            }

            let filteredWords = dictionaryData.message.words;

            // Apply filtering based on selected filter (word, type, definitions, translations)
            if (filter === 'word') {
                filteredWords = filteredWords.filter(word => caseInsensitiveIncludes(word.word, searchTerm));
            } else if (filter === 'type') {
                filteredWords = filteredWords.filter(word => caseInsensitiveIncludes(word.type, searchTerm));
            } else if (filter === 'definitions') {
                filteredWords = filteredWords.filter(word =>
                    word.definitions.some(def => caseInsensitiveIncludes(def, searchTerm))
                );
            } else if (filter === 'translations') {
                filteredWords = filteredWords.filter(word =>
                    word.translations.some(trans => caseInsensitiveIncludes(trans, searchTerm))
                );
            }

            res.json({ words: filteredWords });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Internal server error: Failed to parse dictionary data' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
