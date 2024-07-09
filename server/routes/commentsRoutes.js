const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/comments', commentsController.getComments);
router.post('/comments', commentsController.addComment);

module.exports = router;