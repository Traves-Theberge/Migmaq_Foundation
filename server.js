require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const dictionaryFilePath = path.join(__dirname, "public", "dictionary.json");

function caseInsensitiveIncludes(source, searchTerm) {
  // Check if source is a string and searchTerm is a string
  if (typeof source === "string" && typeof searchTerm === "string") {
    return source.toLowerCase().includes(searchTerm.toLowerCase());
  }
  return false;
}

app.get("/api/interesting", async (req, res) => {
  const word = req.query.word;
  const type = req.query.type;
  const translations = req.query.translations;
  const definitions = req.query.definitions;

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

  //   console.log({ response });

  res.json({
    word,
    type,
    translations,
    definitions,
    fact: response.choices[0].message.content,
  });
});

app.get("/api/dictionary", (req, res) => {
  const searchTerm = req.query.term ? req.query.term.toLowerCase() : "";
  const filter = req.query.filter ? req.query.filter.toLowerCase() : "";

  fs.readFile(dictionaryFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading dictionary file:", err);
      return res.status(500).json({
        error: "Internal server error: Failed to read dictionary file",
      });
    }

    try {
      const dictionaryData = JSON.parse(data);

      if (
        !dictionaryData ||
        !dictionaryData.message ||
        !Array.isArray(dictionaryData.message.words)
      ) {
        return res
          .status(500)
          .json({ error: "Internal server error: Invalid dictionary format" });
      }

      let filteredWords = [];

      // Filter based on selected filter (word, type, definitions, translations)
      if (filter === "word") {
        filteredWords = dictionaryData.message.words.filter((word) =>
          caseInsensitiveIncludes(word.word, searchTerm)
        );
      } else if (filter === "type") {
        filteredWords = dictionaryData.message.words.filter((word) =>
          caseInsensitiveIncludes(word.type, searchTerm)
        );
      } else if (filter === "definitions") {
        filteredWords = dictionaryData.message.words.filter((word) =>
          word.definitions.some((def) =>
            caseInsensitiveIncludes(def, searchTerm)
          )
        );
      } else if (filter === "translations") {
        filteredWords = dictionaryData.message.words.filter((word) =>
          word.translations.some((trans) =>
            caseInsensitiveIncludes(trans, searchTerm)
          )
        );
      } else {
        // Handle other filters or default behavior
        filteredWords = dictionaryData.message.words;
      }

      res.json({ words: filteredWords });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).json({
        error: "Internal server error: Failed to parse dictionary data",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});