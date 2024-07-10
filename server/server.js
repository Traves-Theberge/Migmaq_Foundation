require('dotenv').config(); // Load environment variables from .env file
const app = require('./app'); // Import the Express app

const port = process.env.PORT || 3001; // Set the port from environment variables or default to 3001

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Start the server and log the running port
});
