// server/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const dictionaryRoutes = require('./routes/dictionaryRoutes');
const gamesRoutes = require('./routes/games/gamesRoutes');
const lessonsRoutes = require('./routes/lessons/lessonsRoutes');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client')));

// Route setup
app.use('/api', dictionaryRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/lessons', lessonsRoutes);

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

app.get('/games/flashcard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'games', 'flashcard.html'));
});

app.get('/lessons/lesson1', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'lessons', 'lesson1.html'));
});

// Catch-all to serve HTML files correctly from any nested route
app.get('/*', (req, res) => {
    const filePath = path.join(__dirname, '..', 'client', 'pages', req.params[0]);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Not Found');
        }
    });
});

module.exports = app;
