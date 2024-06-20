/* Description: This file is the entry point for the server. It sets up the server, loads the dictionary data, and provides
 API endpoints for fetching dictionary data and interesting facts about words. */
// 1. Load environment variables from the .env file.
// 2. Import required modules.
// 3. Create an Express app.
// 4. Set the port for the server.
// 5. Enable CORS for all routes.
// 6. Serve static files from the public directory.
// 7. Parse JSON request bodies. This is required to parse the request body for POST requests.
// 8. Define a route to fetch interesting facts about a word.
// 9. Create an OpenAI instance with the API key.
// 10. Create a completion request to generate an interesting fact about the word.
// 11. Send the generated fact as a response to the client.
// 12. Define a route to fetch dictionary data, filter based on search term and filter type.
// 13. Read the dictionary data from the JSON file.
// 14. Parse the dictionary data as JSON.
// 15. Filter the dictionary data based on the search term and filter type. ( Initialize an empty array)
// 15.1 Filter the dictionary data based on the search term and filter type, and send the filtered data as a response. ( Filter the words )
// 15.2 Filter the dictionary data based on the search term and filter type, and send the filtered data as a response. ( Filter the type )
// 15.3 Filter the dictionary data based on the search term and filter type, and send the filtered data as a response. ( Filter the definitions )
// 15.4 Filter the dictionary data based on the search term and filter type, and send the filtered data as a response. ( Filter the translations )
// 15.5 Filter the dictionary data based on the search term and filter type, and send the filtered data as a response. ( Return all words )
// 15.6 Filter the dictionary data based on the search term and filter type, and send the filtered data as a response. ( Send the filtered words as a JSON response )
// 16. Define a helper function to check if a string includes another string case-insensitively.

// 1. Load environment variables from the .env file.
require("dotenv").config();
// 2. Import required modules
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

// 3. Create an Express app.
const app = express();
// 4. Set the port for the server.
const port = process.env.PORT || 3001;

// 5. Enable CORS for all routes
app.use(cors());
// 6. Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
// 7. Parse JSON request bodies. This is required to parse the request body for POST requests.
const dictionaryFilePath = path.join(__dirname, "public", "dictionary.json");

// 16. Define a helper function to check if a string includes another string case-insensitively.
function caseInsensitiveIncludes(source, searchTerm) { // Check if the source string includes the search term case-insensitively.
  // Convert both strings to lowercase and check if the source string includes the search term.
  if (typeof source === "string" && typeof searchTerm === "string") {
    // Use the toLowerCase method to convert both strings to lowercase and check if the source string includes the search term. 
    return source.toLowerCase().includes(searchTerm.toLowerCase());
  }
  // Return false if the source or search term is not a string.
  return false;
}

// 8. Define a route to fetch interesting facts about a word.
app.get("/api/interesting", async (req, res) => {
  // Extract the word, type, translations, and definitions from the query parameters.
  const word = req.query.word;
  const type = req.query.type;
  const translations = req.query.translations;
  const definitions = req.query.definitions;
// 9. Create an OpenAI instance with the API key.
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
 // 10. Create a completion request to generate an interesting fact about the word.
const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `
                I'm a word fact bot, and a specialize in a native american language called Mi'gmaq. I can provide you with interesting facts about words in Mi'gmaq. Keep it short, and respond in a way that does not sound like you are answering a question.
                
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

// 11. Send the generated fact as a response to the client.
  res.json({ // Send the generated fact as a response to the client. 
    //The fact is extracted from the response.choices array and sent as part of the JSON response. 
    word,
    type,
    translations,
    definitions,
    fact: response.choices[0].message.content,
  });
});

// 12. Define a route to fetch dictionary data, filter based on search term and filter type.
app.get("/api/dictionary", (req, res) => {
  // Extract the search term and filter type from the query parameters.
  const searchTerm = req.query.term ? req.query.term.toLowerCase() : "";
  // Extract the filter type from the query parameters.
  const filter = req.query.filter ? req.query.filter.toLowerCase() : "";

  // 13. Read the dictionary data from the JSON file.
  fs.readFile(dictionaryFilePath, "utf8", (err, data) => { 
    // Read the dictionary data from the JSON file using the fs.readFile method.
    if (err) { // IF there is an error reading the file, return a 500 status code and an error message.
      console.error("Error reading dictionary file:", err); // Log an error message to the console.
      return res.status(500).json({ // Return a 500 status code and an error message in the JSON response.
        error: "Internal server error: Failed to read dictionary file", // The error message indicates that there was an error reading the dictionary file.
      });
    }

    // 14. Parse the dictionary data as JSON.
    try { // Try to parse the dictionary data as JSON using the JSON.parse method.
      const dictionaryData = JSON.parse(data); // Parse the data variable as JSON and store it in the dictionaryData variable.
      if ( // Check if the parsed dictionary data is valid.
        !dictionaryData || // Check if the dictionaryData variable is falsy.
        !dictionaryData.message || // Check if the message property is missing or falsy.
        !Array.isArray(dictionaryData.message.words) // Check if the words property is missing or not an array.
      ) { // If the dictionary data is invalid, return a 500 status code and an error message.
        return res
          .status(500)
          .json({ error: "Internal server error: Invalid dictionary format" });
      }
// 15.0. Filter the dictionary data based on the search term and filter type.
      let filteredWords = []; // Initialize an empty array to store the filtered words.

//15.1. Filter the dictionary data based on the search term and filter type, and send the filtered data as a response.
      if (filter === "word") { // Check if the filter type is "word".
        filteredWords = dictionaryData.message.words.filter((word) => // Filter the words based on the search term and the word property.
          caseInsensitiveIncludes(word.word, searchTerm) // Filter the words based on the search term and the word property.
        );
// 15.2. Filter the dictionary data based on the search term and filter type, and send the filtered data as a response.
      } else if (filter === "type") { // Check if the filter type is "type".
        filteredWords = dictionaryData.message.words.filter((word) => // Filter the words based on the search term and the type property.
          caseInsensitiveIncludes(word.type, searchTerm) // Filter the words based on the search term and the type property.
        );
// 15.3. Filter the dictionary data based on the search term and filter type, and send the filtered data as a response.        
      } else if (filter === "definitions") { // Check if the filter type is "definitions".
        filteredWords = dictionaryData.message.words.filter((word) => // Filter the words based on the search term and the definitions property.
          word.definitions.some((def) => // Check if any of the definitions include the search term.
            caseInsensitiveIncludes(def, searchTerm) // Check if any of the definitions include the search term.
          )
        );
// 15.4. Filter the dictionary data based on the search term and filter type, and send the filtered data as a response.
      } else if (filter === "translations") { // Check if the filter type is "translations".
        filteredWords = dictionaryData.message.words.filter((word) => // Filter the words based on the search term and the translations property.
          word.translations.some((trans) => // Check if any of the translations include the search term.
            caseInsensitiveIncludes(trans, searchTerm) // Check if any of the translations include the search term.
          )
        );
// 15.5. Filter the dictionary data based on the search term and filter type, and send the filtered data as a response.
      } else { // If no filter type is specified, return all words.
        filteredWords = dictionaryData.message.words; // If no filter type is specified, return all words.
      }
// 15.6. Filter the dictionary data based on the search term and filter type, and send the filtered data as a response.
      res.json({ words: filteredWords }); // Send the filtered words as a JSON response.
    } catch (error) { // If there is an error parsing the JSON data, return a 500 status code and an error message.
      console.error("Error parsing JSON:", error); // Log an error message to the console.
      res.status(500).json({ // Return a 500 status code and an error message in the JSON response.
        error: "Internal server error: Failed to parse dictionary data", // The error message indicates that there was an error parsing the dictionary data.
      });
    }
  });
});

// Start the server and listen on the specified port.
app.listen(port, () => { // Start the server and listen on the specified port.
  console.log(`Server is running on http://localhost:${port}`); // Log a message to the console indicating that the server is running. 
});