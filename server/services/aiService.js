const openai = require('../config/openai');

// Service method to generate a fact using OpenAI Chat API
exports.generateFact = async ({ word, type, translations, definitions }) => {
    try {
        // Send a request to the OpenAI API with the specified prompt and parameters
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a knowledgeable Mi'gmaq teacher. Share an fact about the "${word}", Keep it between 1-4 sentences.`,
                },
                {
                    role: 'user',
                    content: `Word: ${word}\nType: ${type}\nTranslations: ${translations}\nDefinitions: ${definitions}`,
                },
            ],
            temperature: 0.6,  // Lower temperature for more focused responses
            max_tokens: 100,    // Reduced max tokens to lower cost
            top_p: 0.7,        // Slightly reduced top_p to focus on more likely outputs
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
