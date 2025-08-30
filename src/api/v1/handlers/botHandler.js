const { setCache, generateCacheKey, getCache } = require("../../utils/cache");
const path = require('path');
const fs = require('node:fs');
const default_model = 'models/gemini-2.5-flash-lite-preview-06-17';

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

const memoryPrompt = (t, prevContext) => {
    return `
📘 **Memory & Context**
I retain persistent memory of our conversation. Relevant background:
**Your Memory:**
- [${prevContext}]

---

🧾 **Current Query**  
- [${t}]
`};

const orchestrator = (prompt, manifest) => {
    return `
    ${prompt}

    You are an intelligent API Orchestrator.You are connected to the following tools:
    tools:[${JSON.stringify(manifest.tools, null, 2)}]

    OUTPUT should ALWAYS JSON ONLY (in the below structure and no json tags or any abbrivations):
    {
  "category": "small_talk" | "tool_call" | "no_tool",
  "tool": <tool_name>,
  "widget_type": "",
  "params": [<key>:<value>],
  "missing_params": [],
  "raw_data": <tool_data>,
  "processed_data": <structured_tool_data>,
  "reply": <friendly_response>,
  "meta": {
    "timestamp": <current_timestamp>,
    "confidence": [0.0-1.0],
    "source": <tool_name>,
    "latency_ms": 280
  }
}`;
}
const filePath = path.join(__dirname, '../../../../mcp-manifest.json');
const manifest = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
const askBot = async (t = '', file) => {
    try {
        const memory = await getCache('memory:user:context') || ''; // prev context from redis
        // const prompt = memoryPrompt(t, memory); // prompt preparation
        const prompt2 = orchestrator(t, manifest); // prompt preparation
        const currentContext = await generateContent(prompt2); // feed to gemini ai
        // const summPrompt = summarizePrompt(currentContext, memory); // prompt preparation
        // const updatedMemory = await generateContent(summPrompt); // feed to gemini ai
        // await setCache(generateCacheKey('memory', 'user', 'context'), updatedMemory, 3000) // store the updated
        return { response: currentContext, prompt2 }
    } catch (error) {
        throw error
    }
}




module.exports = {
    askBot
}