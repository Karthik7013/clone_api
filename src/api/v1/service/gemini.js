const { GoogleGenerativeAI } = require("@google/generative-ai");
const default_model = 'models/gemini-2.5-flash-lite-preview-06-17';
// Replace with your Gemini Free API key
const API_KEY = process.env.GEMINI_API_KEY;

// Initialize the client
const genAI = new GoogleGenerativeAI(API_KEY);
// Choose a free model
const MODEL_NAME = "gemini-2.5-flash-lite-preview-06-17"; // fast & free tier
// const MODEL_NAME = "gemini-1.5-flash"; // fast & free tier
// const MODEL_NAME = "gemini-pro"; // fast & free tier
const model = genAI.getGenerativeModel({ model: MODEL_NAME })

// gemini call
const generateContent = async (prompt = '') => {
    const URI = `https://generativelanguage.googleapis.com/v1beta/${default_model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
    try {
        const response = await fetch(URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Set the Content-Type to JSON
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        })
        const data = await response.json(prompt);
        if (data.error) {
            throw new Error(data.error.message || 'An error occurred while processing your request.');
        }
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        return text;
    } catch (error) {
        throw error;
    }
}

const streamContent = async (res, prompt) => {
    try {
        const chat = model.startChat({})
        const result = await chat.sendMessageStream(prompt);
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText)
        }
        res.end()
    } catch (error) {
        throw error
    }
}

module.exports = {
    generateContent,
    streamContent

}