// server/controllers/lessons/lessonsController.js
const lessonsService = require('../../services/lessons/lessonsService');

exports.getLessonData = async (req, res) => {
    const lessonId = req.params.lessonId;
    try {
        const lessonData = await lessonsService.getLessonData(lessonId);
        if (lessonData) {
            res.json(lessonData);
        } else {
            res.status(404).json({ error: 'Lesson not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lesson data' });
    }
};
