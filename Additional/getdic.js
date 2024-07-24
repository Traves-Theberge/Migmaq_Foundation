  // // Description: This file contains the code to fetch the dictionary data from the mobtranslate API and save it to the dictionary.json file.

  // // We are importing the required modules.
  // const express = require('express');
  // const axios = require('axios');
  // const cors = require('cors');
  // const fs = require('fs');
  // const path = require('path');

  // // we are creating a new express app
  // const app = express();
  // // we are setting the port to 3001
  // const port = 3001;

  // // we are using cors
  // app.use(cors()); // Enable CORS for all routes

  // // we are using the public folder to serve static files from the server to the client.
  // const DICTIONARY_API_URL = 'https://mobtranslate.com/api/dictionary/migmaq';
  // // we are creating a path to the dictionary.json file
  // const DICTIONARY_FILE_PATH = path.join(__dirname, 'public', 'dictionary.json');

  // /* We are creating a function to check if the source includes the search term.
  // We are checking if the source is a string and the search term is a string. 
  // If it is a string, we are returning the source in lowercase and checking if
  // it includes the search term in lowercase. */

  // // We are creating a function to fetch and save the dictionary data.
  // async function fetchAndSaveDictionaryData() {
  //   try {
  //     // We are using axios to fetch the data from the DICTIONARY_API_URL
  //     const response = await axios.get(DICTIONARY_API_URL);
  //     // We are getting the data from the response
  //     const data = response.data;
      
  //     // Write data to dictionary.json
  //     fs.writeFileSync(DICTIONARY_FILE_PATH, JSON.stringify(data, null, 2));
  //     console.log('Dictionary data saved successfully.');
  //   } catch (error) {
  //     console.error('Error fetching data:', error.message);
  //   }
  // }

  // // We are creating a get request to fetch the dictionary data and save it to the dictionary.json file.
  // app.get('/fetch-dictionary', async (req, res) => {
  //   await fetchAndSaveDictionaryData();
  //   res.send('Dictionary data fetched and saved.');
  // });

  // // We are creating a get request to get the dictionary data from the dictionary.json file.
  // app.get('/dictionary.json', (req, res) => {
  //   res.sendFile(DICTIONARY_FILE_PATH);
  // });

  // app.listen(port, () => {
  //   console.log(`Server listening on port ${port}`);
    
  //   // Fetch and save the dictionary data when the server starts
  //   fetchAndSaveDictionaryData();
  // });
