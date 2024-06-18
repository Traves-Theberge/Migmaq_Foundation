const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

const DICTIONARY_API_URL = 'https://mobtranslate.com/api/dictionary/migmaq';
const DICTIONARY_FILE_PATH = path.join(__dirname, 'public', 'dictionary.json');

// Fetch and save dictionary data
async function fetchAndSaveDictionaryData() {
  try {
    const response = await axios.get(DICTIONARY_API_URL);
    const data = response.data;
    
    // Write data to dictionary.json
    fs.writeFileSync(DICTIONARY_FILE_PATH, JSON.stringify(data, null, 2));
    console.log('Dictionary data saved successfully.');
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

// Endpoint to trigger data fetch and save
app.get('/fetch-dictionary', async (req, res) => {
  await fetchAndSaveDictionaryData();
  res.send('Dictionary data fetched and saved.');
});

// Serve the dictionary.json file
app.get('/dictionary.json', (req, res) => {
  res.sendFile(DICTIONARY_FILE_PATH);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  
  // Fetch and save the dictionary data when the server starts
  fetchAndSaveDictionaryData();
});
