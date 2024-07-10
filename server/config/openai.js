const OpenAI = require('openai'); // Import the OpenAI library

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = openai; // Export the OpenAI client
