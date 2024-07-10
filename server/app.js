const express = require('express');
const cors = require('cors');
const path = require('path');
const dictionaryRoutes = require('./routes/dictionaryRoutes');
const wordOfTheDayRoutes = require('./routes/wordOfTheDayRoutes');
const aiRoutes = require('./routes/aiRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON body parsing
app.use(express.static(path.join(__dirname, '..', 'client'))); // Serve static files from the 'client' directory

// Route setup
app.use('/api', dictionaryRoutes); // Dictionary routes
app.use('/api', wordOfTheDayRoutes); // Word of the Day routes
app.use('/api', aiRoutes); // AI-related routes
app.use('/api', commentsRoutes); // Comments routes

// Serve HTML files for different routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'index.html'));
});

app.get('/education', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'education.html'));
});

app.get('/dictionary', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'dictionary.html'));
});

app.get('/word-details', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'word-details.html'));
});

app.get('/word-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'word-details.html'));
});

module.exports = app; // Export the app for use in other modules
