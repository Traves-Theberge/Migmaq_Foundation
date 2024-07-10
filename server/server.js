require('dotenv').config();
const app = require('./app');
const cron = require('node-cron');
const axios = require('axios');

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Schedule the cron job to run daily at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        await axios.put(`http://localhost:${port}/api/word-of-the-day/update`);
        console.log('Word of the Day updated successfully');
    } catch (error) {
        console.error('Error updating Word of the Day:', error);
    }
});
