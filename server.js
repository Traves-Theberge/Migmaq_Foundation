require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const OpenAI = require("openai"); // Ensure you have the OpenAI library installed
const cron = require("node-cron");

const app = express();
const port = process.env.PORT || 3001;
const dictionaryFilePath = path.join(__dirname, "public", "dictionary.json");
const wordOfTheDayFilePath = path.join(__dirname, "public", "wordOfTheDay.json");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Initialize OpenAI API with the provided API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

async function readWordOfTheDayFile() {
    try {
        const data = await fs.readFile(wordOfTheDayFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading word of the day file:", error);
        throw new Error("Internal server error: Failed to read word of the day file");
    }
}

async function writeWordOfTheDayFile(word) {
    try {
        await fs.writeFile(wordOfTheDayFilePath, JSON.stringify(word, null, 2));
    } catch (error) {
        console.error("Error writing word of the day file:", error);
        throw new Error("Internal server error: Failed to write word of the day file");
    }
}

function getRandomWord(words) {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
}

// Function to ensure word of the day file exists
async function ensureWordOfTheDayFile() {
    try {
        await fs.access(wordOfTheDayFilePath);
    } catch {
        const dictionaryData = await readDictionaryFile();
        const wordOfTheDay = getRandomWord(dictionaryData.message.words);
        await writeWordOfTheDayFile(wordOfTheDay);
        console.log("Word of the day file created:", wordOfTheDay.word);
    }
}

// Update word of the day at midnight every day
cron.schedule("0 0 * * *", async () => {
    try {
        const dictionaryData = await readDictionaryFile();
        const wordOfTheDay = getRandomWord(dictionaryData.message.words);
        await writeWordOfTheDayFile(wordOfTheDay);
        console.log("Word of the day updated:", wordOfTheDay.word);
    } catch (error) {
        console.error("Error updating word of the day:", error);
    }
});

// Ensure word of the day file exists on server start
ensureWordOfTheDayFile();

// Endpoint to fetch word of the day
app.get("/api/word-of-the-day", async (req, res) => {
    try {
        const wordOfTheDay = await readWordOfTheDayFile();
        res.json(wordOfTheDay);
    } catch (error) {
        console.error("Error fetching word of the day:", error);
        res.status(500).json({
            error: "Internal server error: Failed to fetch word of the day",
        });
    }
});

// Endpoint to fetch dictionary data
app.get("/api/dictionary", async (req, res) => {
    try {
        const dictionaryData = await readDictionaryFile();
        res.json({ words: dictionaryData.message.words });
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

// Endpoint to fetch interesting facts about a word
app.get("/api/interesting", async (req, res) => {
    const { word, type, translations, definitions } = req.query;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are a knowledgeable Mi'gmaq linguist. Share an insightful fact or story about the word "${word}", its origins, and its cultural significance.`,
                },
                {
                    role: "user",
                    content: `Word: ${word}\nType: ${type}\nTranslations: ${translations}\nDefinitions: ${definitions}`,
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
        console.error("Error generating interesting fact:", error.response ? error.response.data : error.message);
        res.status(500).json({
            error: "Internal server error: Failed to generate interesting fact",
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
