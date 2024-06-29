require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises; // Using promises for async file operations
const path = require("path");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3001;
const dictionaryFilePath = path.join(__dirname, "public", "dictionary.json");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Helper functions
async function readDictionaryFile() {
    try {
        const data = await fs.readFile(dictionaryFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading dictionary file:", error);
        throw new Error("Internal server error: Failed to read dictionary file");
    }
}

function caseInsensitiveIncludes(source, searchTerm) {
    if (typeof source === "string" && typeof searchTerm === "string") {
        return source.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
}

function startsWith(source, searchTerm) {
    if (typeof source === "string" && typeof searchTerm === "string") {
        return source.toLowerCase().startsWith(searchTerm.toLowerCase());
    }
    return false;
}

// Endpoint to fetch interesting facts about a word
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
 embody the role of a knowledgeable Mi'gmaq linguist and share an insightful fact or story about a specific Mi'gmaq word, its origins, and its cultural significance.
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

// Endpoint to fetch dictionary data with pagination and search
app.get("/api/dictionary", async (req, res) => {
    const { term, filter, page = 1, limit = 20 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    try {
        const dictionaryData = await readDictionaryFile();

        let filteredWords = dictionaryData.message.words;

        if (term) {
            const searchTerm = term.toLowerCase();
            switch (filter) {
                case "word":
                    filteredWords = filteredWords.filter((word) =>
                        caseInsensitiveIncludes(word.word, searchTerm)
                    );
                    break;
                case "type":
                    filteredWords = filteredWords.filter((word) =>
                        caseInsensitiveIncludes(word.type, searchTerm)
                    );
                    break;
                case "definitions":
                    filteredWords = filteredWords.filter((word) =>
                        word.definitions.some((def) =>
                            caseInsensitiveIncludes(def, searchTerm)
                        )
                    );
                    break;
                case "translations":
                    filteredWords = filteredWords.filter((word) =>
                        word.translations.some((trans) =>
                            caseInsensitiveIncludes(trans, searchTerm)
                        )
                    );
                    break;
                case "startsWith":
                    filteredWords = filteredWords.filter((word) =>
                        startsWith(word.word, searchTerm)
                    );
                    break;
                default:
                    break;
            }
        }

        const totalItems = filteredWords.length;

        if (filter !== "startsWith") {
            filteredWords = filteredWords.slice((pageNumber - 1) * limitNumber, pageNumber * limitNumber);
        }

        res.json({ words: filteredWords, total: totalItems });
    } catch (error) {
        console.error("Error fetching dictionary data:", error);
        res.status(500).json({
            error: "Internal server error: Failed to fetch dictionary data",
        });
    }
});

// Endpoint to fetch details of a specific word
app.get("/api/word-details", async (req, res) => {
    const { word } = req.query;

    try {
        const dictionaryData = await readDictionaryFile();
        const wordDetails = dictionaryData.message.words.find(
            (item) => item.word === word
        );

        if (!wordDetails) {
            return res.status(404).json({
                error: "Word not found in the dictionary",
            });
        }

        res.json(wordDetails);
    } catch (error) {
        console.error("Error fetching word details:", error);
        res.status(500).json({
            error: "Internal server error: Failed to fetch word details",
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
