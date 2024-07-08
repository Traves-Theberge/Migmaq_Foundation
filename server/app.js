const express = require('express');
const cors = require('cors');
const path = require('path');
const dictionaryRoutes = require('./routes/dictionaryRoutes');
const wordOfTheDayRoutes = require('./routes/wordOfTheDayRoutes');
const aiRoutes = require('./routes/aiRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client'))); // Serve static files from the 'client' directory

app.use('/api', dictionaryRoutes);
app.use('/api', wordOfTheDayRoutes);
app.use('/api', aiRoutes);
app.use('/api', commentsRoutes);

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'index.html'));
});

// Serve the education.html file for the /education route
app.get('/education', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'education.html'));
});

// Serve the dictionary.html file for the /dictionary route
app.get('/dictionary', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'dictionary.html'));
});

// Serve the word-details.html file for the /word-details route
app.get('/word-details', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'word-details.html'));
});

// Serve the word-details.html file for routes with query parameters
app.get('/word-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'word-details.html'));
});

module.exports = app;
