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
  if (typeof source === "string" && typeof searchTerm === "string") {
    return source.toLowerCase().includes(searchTerm.toLowerCase());
  }
  return false;
}

app.get("/api/interesting", async (req, res) => {
  const { word, type, translations, definitions } = req.query;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: ` 
Delve into the richness of Mi'gmaq language with a fascinating fact: certain words in Mi'gmaq encapsulate knowledge of the language, illustrating the profound connection between indigenous languages and their environments.               
                
                Word: ${word}
                Type: ${type}
                Translations: ${translations}
                Definitions: ${definitions}

                Here's a fact and/or example about the Word. Keep it no longer than 1.5-2.5 sentences.
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

    res.json({
      word,
      type,
      translations,
      definitions,
      fact: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error generating interesting fact:", error);
    res.status(500).json({
      error: "Internal server error: Failed to generate interesting fact",
    });
  }
});

app.get("/api/dictionary", (req, res) => {
  const { term, filter } = req.query;

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
        return res.status(500).json({
          error: "Internal server error: Invalid dictionary format",
        });
      }

      let filteredWords = dictionaryData.message.words;

      if (term) {
        const searchTerm = term.toLowerCase();
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
        }
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
