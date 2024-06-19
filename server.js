// Description: This file contains the server-side code for the API server.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

// We are creating a new express app.
const app = express();
// We are setting the port to 3001.
const port = process.env.PORT || 3001;

// We are using cors.
app.use(cors());

// We are using the public folder to serve static files from the server to the client.
app.use(express.static(path.join(__dirname, "public")));

// We are creating a path to the dictionary.json file.
const dictionaryFilePath = path.join(__dirname, "public", "dictionary.json");

// We are creating a function to check if the source includes the search term. We are checking if the source is a string and the search term is a string. If it is a string, we are returning the source in lowercase and checking if it includes the search term in lowercase.
function caseInsensitiveIncludes(source, searchTerm) {
  // Check if source is a string and searchTerm is a string
  if (typeof source === "string" && typeof searchTerm === "string") {
    // Check if source includes searchTerm (case-insensitive) using toLowerCase
    return source.toLowerCase().includes(searchTerm.toLowerCase());
  }
  // Return false if source or searchTerm is not a string
  return false;
}

// We are creating a get request to fetch the dictionary data and save it to the dictionary.json file.
// We are getting the word, type, translations, and definitions from the query parameters.app.get("/api/interesting", async (req, res) => {
 
  const word = req.query.word;
  const type = req.query.type;
  const translations = req.query.translations;
  const definitions = req.query.definitions;

  // We are creating a new OpenAI instance with the API key.
  // We are setting the API key from the environment variables.
  // We are using the OpenAI instance to create a chat completion with the word data.

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
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

// We are sending a JSON response with the word, type, translations, definitions, and the fact from the response.
  res.json({
    word,
    type,
    translations,
    definitions,
    fact: response.choices[0].message.content,
  });

// We are creating a get request to get the dictionary data from the dictionary.json file.
app.get("/api/dictionary", (req, res) => {
  // We are getting the search term and filter from the query parameters.
  const searchTerm = req.query.term ? req.query.term.toLowerCase() : "";
  // We are getting the filter from the query parameters.
  const filter = req.query.filter ? req.query.filter.toLowerCase() : "";
  // We are reading the dictionary file.
  fs.readFile(dictionaryFilePath, "utf8", (err, data) => {
    // We are handling any errors that occur during the file read.
    if (err) {
      // We are logging the error to the console.
      console.error("Error reading dictionary file:", err);
      // We are sending a JSON response with an error message.
      return res.status(500).json({
        error: "Internal server error: Failed to read dictionary file",
      });
    }
    // We are parsing the dictionary data from the file.
    try {
      const dictionaryData = JSON.parse(data);

      // We are checking if the dictionary data is valid.
      if (
        // We are checking if the dictionary data is valid.
        !dictionaryData ||
        // We are checking if the dictionary data message is valid.
        !dictionaryData.message ||
        // We are checking if the dictionary data message words is valid.
        !Array.isArray(dictionaryData.message.words)
      ) {
        // We are sending a JSON response with an error message.
        return res
          .status(500)
          .json({ error: "Internal server error: Invalid dictionary format" });
      }
      // We are creating a new array to store the filtered words.
      let filteredWords = [];

      // We are filtering the words based on the search term and filter.
      if (filter === "word") {
        // We are filtering the words array to only include words that start with the search term.
        filteredWords = dictionaryData.message.words.filter((word) =>
          // We are checking if the word includes the search term.
          caseInsensitiveIncludes(word.word, searchTerm)
        );

        // We are checking if the length of the filtered words array is equal to 0.
      } else if (filter === "type") {
        // We are filtering the words array to only include words that have the search term as the type.
        filteredWords = dictionaryData.message.words.filter((word) =>
          // We are checking if the type includes the search term.
          caseInsensitiveIncludes(word.type, searchTerm)
        );
        // We are checking if the length of the filtered words array is equal to 0.
      } else if (filter === "definitions") {
        // We are filtering the words array to only include words that have the search term in the definitions.
        filteredWords = dictionaryData.message.words.filter((word) =>
          // We are checking if the definitions include the search term.
          word.definitions.some((def) =>
            // We are checking if the definition includes the search term.
            caseInsensitiveIncludes(def, searchTerm)
          )
        );

        // We are checking if the length of the filtered words array is equal to 0.
      } else if (filter === "translations") {
        // We are filtering the words array to only include words that have the search term in the translations.
        filteredWords = dictionaryData.message.words.filter((word) =>
          // We are checking if the translations include the search term.
          word.translations.some((trans) =>
            // We are checking if the translation includes the search term.
            caseInsensitiveIncludes(trans, searchTerm)
          )
        );
        // We are checking if the length of the filtered words array is equal to 0.
      } else {
        // We are setting the filtered words to the dictionary data message words.
        filteredWords = dictionaryData.message.words;
      }
      // We are sending a JSON response with the filtered words.
      res.json({ words: filteredWords });
      // We are handling any errors that occur during the JSON parsing.
    } catch (error) {
      // We are logging the error to the console.
      console.error("Error parsing JSON:", error);
      // We are sending a JSON response with an error message.
      res.status(500).json({
        error: "Internal server error: Failed to parse dictionary data",
      });
    }
  });
});

// We are creating a get request to fetch the dictionary data and save it to the dictionary.json file.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
