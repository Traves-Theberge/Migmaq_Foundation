const openai = require('../config/openai');

// Function to get a fact from OpenAI
exports.getFact = async (word) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are a knowledgeable Mi'gmaq linguist. Share an insightful fact or story about the word "${word}", its origins, and its cultural significance. keep it short between 1 - 2 sentences.`,
                },
                {
                    role: "user",
                    content: `Word: ${word}`,
                },
            ],
            temperature: 1, // Sampling temperature
            max_tokens: 256, // Maximum number of tokens in the completion
            top_p: 1, // Nucleus sampling parameter
            frequency_penalty: 0, // Frequency penalty
            presence_penalty: 0, // Presence penalty
        });

        return response.choices[0].message.content.trim(); // Return the trimmed response content
    } catch (error) {
        console.error('Error fetching AI fact:', error);
        throw new Error('Error fetching AI fact'); // Throw a new error if fetching fails
    }
};
