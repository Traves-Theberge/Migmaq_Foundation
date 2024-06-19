// Description: This file is the entry point for the server. It sets up the server, loads the dictionary data, and provides API endpoints for fetching dictionary data and interesting facts about words.

// Load environment variables from .env file
require("dotenv").config();
// Import required modules
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

// Create an Express app.
const app = express();
// Set the port for the server.
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
// Parse JSON request bodies. This is required to parse the request body for POST requests.
const dictionaryFilePath = path.join(__dirname, "public", "dictionary.json");

// Load the dictionary data from the JSON file.
function caseInsensitiveIncludes(source, searchTerm) {
  // Check if source is a string and searchTerm is a string. 
  // If both are strings, convert them to lowercase and check if the source includes the searchTerm.
  // Return true if the source includes the searchTerm, otherwise return false.
  if (typeof source === "string" && typeof searchTerm === "string") {
    return source.toLowerCase().includes(searchTerm.toLowerCase());
  }
  return false;
}

// Define a route to fetch interesting facts about a word.
app.get("/api/interesting", async (req, res) => {
  // Extract the word, type, translations, and definitions from the query parameters.
  const word = req.query.word;
  const type = req.query.type;
  const translations = req.query.translations;
  const definitions = req.query.definitions;
// Create an OpenAI instance with the API key.
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
// Create a completion request to generate an interesting fact about the word.
// Use the GPT-4o model for generating the fact.
// The system message provides context about the word and its details example: word, type, translations, definitions.
// The temperature, max_tokens, top_p, frequency_penalty, and presence_penalty are set to control the completion generation.
// The response contains the generated fact.  
const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `
                I'm a word fact bot, and a specialize in a native american language called Mi'gmaq. I can provide you with interesting facts about words in Mi'gmaq. Keep it short, relate to other indiginous languages if you can.
                
                Word: ${word}
                Type: ${type}
                Translations: ${translations}
                Definitions: ${definitions}

                Here's a fact about the word
            `,
          },
        ],
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  //   console.log({ response });

  // Send the generated fact as a response to the client.
  // The response contains the word, type, translations, definitions, and the generated fact.
  // The fact is extracted from the response choices and sent as part of the JSON response.
  res.json({
    word,
    type,
    translations,
    definitions,
    fact: response.choices[0].message.content,
  });
});

// define a route to fetch dictionary data, filter based on search term and filter type.
// The route reads the dictionary data from the JSON file, parses the data, and filters the words based on the search term and filter type.
app.get("/api/dictionary", (req, res) => {
  // Extract the search term and filter type from the query parameters.
  const searchTerm = req.query.term ? req.query.term.toLowerCase() : "";
  // The filter parameter is used to specify the type of filter (word, type, definitions, translations).
  const filter = req.query.filter ? req.query.filter.toLowerCase() : "";
// Read the dictionary data from the JSON file.
// The dictionary data is read from the dictionary.json file using the fs.readFile method.
// The file is read in utf8 encoding, and the data is parsed as JSON.
  fs.readFile(dictionaryFilePath, "utf8", (err, data) => {
    if (err) {
      // Handle the error by sending a 500 status code and an error message in the response.
      console.error("Error reading dictionary file:", err);
      // Return an error response if there is an error reading the dictionary file.
      return res.status(500).json({
        error: "Internal server error: Failed to read dictionary file",
      });
    }
    // Parse the dictionary data as JSON. 
    // The parsed data is checked to ensure it contains the expected structure.
    try {
      const dictionaryData = JSON.parse(data);
// Check if the parsed data is valid and contains the expected structure.
// The parsed data should contain a message field with an array of words.
// Return an error response if the dictionary data is invalid or does not contain the expected structure.
// The response contains an error message indicating an internal server error due to an invalid dictionary format.
      if (
        !dictionaryData ||
        !dictionaryData.message ||
        !Array.isArray(dictionaryData.message.words)
      ) {
        return res
          .status(500)
          .json({ error: "Internal server error: Invalid dictionary format" });
      }

      // Initializes as an empty array
      let filteredWords = [];
      // Filter the words based on the search term and filter word.
      if (filter === "word") {
        filteredWords = dictionaryData.message.words.filter((word) =>
          caseInsensitiveIncludes(word.word, searchTerm)
        );
        // Filter the words based on the search term and filter type.
      } else if (filter === "type") {
        filteredWords = dictionaryData.message.words.filter((word) =>
          caseInsensitiveIncludes(word.type, searchTerm)
        );
        // Filter the words based on the search term and filter definitions.
      } else if (filter === "definitions") {
        filteredWords = dictionaryData.message.words.filter((word) =>
          word.definitions.some((def) =>
            caseInsensitiveIncludes(def, searchTerm)
          )
        );
        // Filter the words based on the search term and filter translations.
      } else if (filter === "translations") {
        filteredWords = dictionaryData.message.words.filter((word) =>
          word.translations.some((trans) =>
            caseInsensitiveIncludes(trans, searchTerm)
          )
        );
        // If no filter is specified, filter based on the search term in all fields.
      } else {
        // Handle other filters or default behavior
        filteredWords = dictionaryData.message.words;
      }
// Send the filtered words as a response to the client.
      res.json({ words: filteredWords });
      // Catch and handle any errors that occur during JSON parsing.
    } catch (error) {
      // Handle the error by sending a 500 status code and an error message in the response.
      console.error("Error parsing JSON:", error);
      res.status(500).json({
        //  Return an error response if there is an error parsing the dictionary data.
        error: "Internal server error: Failed to parse dictionary data",
      });
    }
  });
});

// Start the server and listen on the specified port.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});