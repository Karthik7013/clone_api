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

const streamContent = async (res, prompt, fileData) => {
    try {
        const chat = model.startChat({
        });
        const promptBuilder = `
        filedata:[${fileData || null}]
        HINT: use this file data for better response
        query:[${prompt}]
        `
        const result = await chat.sendMessageStream(promptBuilder);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            const payload = JSON.stringify({ type: "chunk", content: chunkText });
            res.write(`data: ${payload}\n\n`);
        }

        // send explicit end event
        res.write(`event: end\ndata: [DONE]\n\n`);
        res.end();
    } catch (error) {
        const payload = JSON.stringify({ type: "error", message: error.message });
        res.write(`event: error\ndata: ${payload}\n\n`);
        res.end();
    }
};


module.exports = {
    generateContent,
    streamContent

}