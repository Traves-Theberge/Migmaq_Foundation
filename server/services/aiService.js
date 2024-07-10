const openai = require('../config/openai');

// Service method to generate a fact using OpenAI Chat API
exports.generateFact = async ({ word, type, translations, definitions }) => {
    try {
        // Send a request to the OpenAI API with the specified prompt and parameters
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `You are a knowledgeable Mi'gmaq linguist. Share an insightful fact or story about the word "${word}", its origins, and its cultural significance. Keep it short between 1-2 sentences.`,
                },
                {
                    role: 'user',
                    content: `Word: ${word}\nType: ${type}\nTranslations: ${translations}\nDefinitions: ${definitions}`,
                },
            ],
            temperature: 1,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        // Extract and return the generated fact from the API response
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating fact with OpenAI:', error.response ? error.response.data : error.message);
        throw error;
    }
};
