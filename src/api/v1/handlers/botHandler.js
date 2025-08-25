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
    tools:[${JSON.stringify(manifest.tools, null, 2)}]
    You are an intelligent API Orchestrator.You are connected to the following tools:

    Your job is to:
    1. Read the user's latest message.
    2. Decide if the request:
   a) Requires calling one of the available tools/APIs
   b) Can be answered directly with a friendly conversational reply (small_talk)
   c) Cannot match any tool confidently (no_tool)
3. If a tool is required:
   - Select the single most relevant one.
   - Identify all required parameters from the user message.
   - If parameters are missing, clearly list them in "missing_params" without making up values.
4. Apply conflict resolution rules if the query matches multiple tools.
5. Match synonyms and variations for parameters (e.g., "NYC" → city=New York City, "BTC" → symbol=bitcoin) only if unambiguous.

---

Available Tools & Rules:
1. weather_api — Get current weather and forecasts.
   Required params: city, country_code.
   Notes: Recognize city nicknames and abbreviations. If city found but not country_code, mark country_code as missing.

2. news_api — Get latest news.
   Required params: topic OR country.
   Notes: If both given, use both. If unclear, mark missing.

3. search_api — Search the web.
   Required params: query.
   Notes: Use as fallback for factual questions that don't match other tools.

4. crypto_api — Get cryptocurrency prices.
   Required params: symbol.
   Notes: Recognize tickers (BTC, ETH) and names.

5. joke_api — Get a random joke.
   Required params: none.
   Priority: If the query contains humor-related words (joke, funny, make me laugh), choose this over others even if other keywords appear.

---

Conflict Resolution:
- Joke requests override all other tools.
- Weather queries override search_api if location is given.
- Crypto queries override search_api if cryptocurrency is clearly mentioned.
- If multiple tools possible and rules don't decide, choose the most direct match.
- If still unsure, set category=no_tool.

---

Output JSON ONLY in the following format:
{
  "category": "tool_call" | "small_talk" | "no_tool",
  "tool": "<tool_name or null>",
  "params": { "<param_name>": "<value or null>" },
  "missing_params": ["list of missing param names"],
  "reply": "<If small_talk, your direct friendly response here>",
  "confidence": 0.0-1.0
}

Rules:
- If category = "small_talk", tool = null and missing_params = [].
- If category = "no_tool", tool = null, params = {}, missing_params = [], reply = "".
- If category = "tool_call" and missing_params is NOT empty, DO NOT fabricate values.
- Keep reply short, friendly, and context-aware only if category=small_talk.
`;
}

const askBot = async (t = '', file) => {
    try {
        const filePath = path.join(__dirname, '../../../../mcp-manifest.json');
        const manifest = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
        // return manifest.tools ;
        const memory = await getCache('memory:user:context') || ''; // prev context from redis
        const prompt = memoryPrompt(t, memory); // prompt preparation
        // const prompt2 = toolPrompt(prompt, manifest); // prompt preparation

        const currentContext = await generateContent(prompt); // feed to gemini ai
        return { response: currentContext, file }
        const summPrompt = summarizePrompt(currentContext, memory); // prompt preparation
        const updatedMemory = await generateContent(summPrompt); // feed to gemini ai
        await setCache(generateCacheKey('memory', 'user', 'context'), updatedMemory, 3000) // store the updated
        return { response: currentContext, file }
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