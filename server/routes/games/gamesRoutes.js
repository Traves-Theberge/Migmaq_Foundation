// server/routes/games/gamesRoutes.js
const express = require('express');
const router = express.Router();
const gamesController = require('../../controllers/games/gamesController');

// Route to get game data based on game type
router.get('/:gameType', gamesController.getGameData);

module.exports = router;
