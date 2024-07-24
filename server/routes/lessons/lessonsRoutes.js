// server/routes/lessons/lessonsRoutes.js
const express = require('express');
const router = express.Router();
const lessonsController = require('../../controllers/lessons/lessonsController');

router.get('/:lessonId', lessonsController.getLessonData);

module.exports = router;
