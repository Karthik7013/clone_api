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

const toolPrompt = (prompt, manifest) => {
    return `
    ${prompt}

    You are an intelligent API Orchestrator.You are connected to the following tools:
    tools:[${JSON.stringify(manifest.tools, null, 2)}]


   
   
   
   
   
   
 

`;
}

const askBot = async (t = '', file) => {
    try {
        const filePath = path.join(__dirname, '../../../../mcp-manifest.json');
        const manifest = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
        // return manifest.tools ;
        const memory = await getCache('memory:user:context') || ''; // prev context from redis
        const prompt = memoryPrompt(t, memory); // prompt preparation
        const prompt2 = toolPrompt(prompt, manifest); // prompt preparation
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

/**
    1️⃣ Call Gemini → Send actual user question
    🔹 Ask: "Which tool should I use & with what parameters?"
    
    2️⃣ Gemini → Returns tool name + parameters
    🔹 Example: { "tool": "getOrderStatus", "parameters": { "orderId": 123 } }

    3️⃣ MCP Client → Calls the chosen tool's API
    🔹 Example: POST /getOrderStatus { "orderId": 123 }

    4️⃣ Call Gemini again → Send the API result
    🔹 Ask: "Format this nicely for the user."
{
  "category": "tool_call",
  "tool": "weather_api",
  "widget_type": "weather_card",  // front-end renders WeatherCard component
  "params": { "city": "London", "country_code": "GB" },
  "missing_params": [],
  "raw_data": {
    "temperature": 18,
    "condition": "Cloudy"
  },
  "processed_data": {
    "icon": "🌥",
    "description": "Cloudy",
    "temp_c": 18
  },
  "reply": "It's cloudy in London, 18°C — take an umbrella ☔",
  "meta": {
    "timestamp": "2025-08-10T12:45:30Z",
    "confidence": 0.94,
    "source": "OpenWeatherMap",
    "latency_ms": 280
  }
}


 */