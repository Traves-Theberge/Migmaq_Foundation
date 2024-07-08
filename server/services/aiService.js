const openai = require('../config/openai');

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
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error fetching AI fact:', error);
        throw new Error('Error fetching AI fact');
    }
};
