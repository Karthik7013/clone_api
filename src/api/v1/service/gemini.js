const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getCache, setCache, generateCacheKey } = require("../../utils/cache");
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

const memoryPrompt = (t, prevContext, fileData) => {
    return `
📘 **Memory & Context**
I retain persistent memory of our conversation. Relevant background:
**Your Memory:**
- [${prevContext}]
- external data source (file | api response)
  [${fileData}]

---

🧾 **Current Query**  
- [${t}]
`};


const summarizePrompt = (query = '', file_data = '', currentContext = '', prevContext = '') => {
    const prompt = `
    **ROLE:** You are a conversation summarization system. Your only goal is to condense a conversation into a minimal, meaningful summary for future context.

**FULL CONVERSATION HISTORY FOR THIS TURN:**

1. **Existing Context Summary:** ${prevContext}
2. **User's Uploaded File Data:** ${file_data}
3. **User's Query:** ${query}
4. **AI's Response:** ${currentContext}

**TASK:** Create a concise, new summary that captures the essential meaning, facts, decisions, and user preferences from the entire interaction above.

**RULES:**
- Be extremely concise. Your summary must be shorter than the input.
- Paraphrase and combine information. Omit all greetings and filler words.
- Focus on objective facts and conclusions, not the style of the conversation.
- This summary will be the only memory provided to an AI in the next turn of this conversation.
- Output nothing but the summary itself.

**NEW CONTEXT SUMMARY:**
    `;
    return prompt

}

const streamContent = async (res, query, fileData) => {
    try {
        const prevMemory = await getCache('memory:user:conversation') || ''; // prev context from redis
        const promptBuilder = memoryPrompt(query, prevMemory, fileData); // query + prevMemory + fileData
        const chat = model.startChat({});
        const result = await chat.sendMessageStream(promptBuilder);
        let finalmessage = ''
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            finalmessage += chunkText;
            const payload = JSON.stringify({ type: "chunk", content: chunkText });
            res.write(`data: ${payload}\n\n`);
        }
        const summPrompt = summarizePrompt(query, fileData, finalmessage, prevMemory);
        const updatedMemory = await generateContent(summPrompt); // feed to gemini ai
        await setCache(generateCacheKey('memory', 'user', 'conversation'), updatedMemory, 3000) // store the updated
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