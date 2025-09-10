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


const summarizePrompt = (currentContext = '', prevContext = '') => {
    const prompt = `
    **Conversation Summarization Task**
*Create a condensed context snapshot for future chatbot interactions*

### Inputs:
1. **Previous Summary** (${prevContext})  
2. **Current Response** (${currentContext})

### Output Requirements:
**Core Objective**:  
Generate a standalone, reusable context summary that:  
- Preserves all essential information for coherent future replies  
- Maintains user-specific details and conversation trajectory  
- Enables seamless context restoration  

### Guidelines:
**✅ MUST INCLUDE**  
- User identity markers (name, pronouns)  
- Explicitly stated preferences/interests  
- Active goals or projects  
- Decided action items  
- Persistent emotional tones (e.g., "frustrated with X")  
- Open loops/unresolved questions  

**🚫 MUST EXCLUDE**  
- Redundant information  
- Greetings/closings (unless critical)  
- Verbatim quotes (paraphrase instead)  
- Transient mood indicators  
- Assistant's internal processing notes  

**Format Rules:**  
1. **Third-person perspective**  
   - *Example*: "User is exploring [topic] and needs [specific help]"  
2. **Bullet-point structure** (max 5 items)  
3. **Conciseness priority** (<100 words)  
4. **Time-aware framing**  
   - Use temporal markers: *"Previously...", "Recently...", "Currently..."*

### Output Format:
**Updated Context Summary:**  
[Concise bullet-point summary combining previous and current context]
    `;
    return prompt

}

const streamContent = async (res, query, fileData) => {
    try {
        const prevMemory = await getCache('memory:user:conversation') || ''; // prev context from redis
        const promptBuilder = memoryPrompt(query, prevMemory, fileData); // query + prevMemory + fileData
        console.log(promptBuilder);
        const chat = model.startChat({});
        const result = await chat.sendMessageStream(promptBuilder);
        let finalmessage = ''
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            finalmessage += chunkText;
            const payload = JSON.stringify({ type: "chunk", content: chunkText });
            res.write(`data: ${payload}\n\n`);
        }
        const summPrompt = summarizePrompt(finalmessage, prevMemory);
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