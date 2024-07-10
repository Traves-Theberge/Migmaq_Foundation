// server/controllers/games/gamesController.js
const gamesService = require('../../services/games/gamesService');

// Controller to handle fetching game data
exports.getGameData = async (req, res) => {
    const gameType = req.params.gameType;
    try {
        const gameData = await gamesService.getGameData(gameType);
        res.json(gameData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch game data' });
    }
};
