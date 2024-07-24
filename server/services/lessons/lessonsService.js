// server/services/lessons/lessonsService.js
const fs = require('fs').promises;
const path = require('path');

const lessonsFilePath = path.join(__dirname, '..', '..', '..', 'client', 'assets', 'lessons.json');

exports.getLessonData = async (lessonId) => {
    try {
        const data = await fs.readFile(lessonsFilePath, 'utf8');
        const lessons = JSON.parse(data);
        return lessons[lessonId] || null;
    } catch (error) {
        throw new Error('Error reading lessons file');
    }
};
