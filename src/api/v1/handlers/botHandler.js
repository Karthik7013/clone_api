const { setCache, generateCacheKey, getCache } = require("../../utils/cache");
const path = require('path');
const fs = require('node:fs');
const { streamContent } = require("../service/gemini");
const { sendTeligramMessage } = require("./teligramMessageHandler");
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
STRICT DIRECTIVES:
1. You are an API Orchestrator that processes user inputs against defined tools.
2. You MUST output ONLY valid JSON in the exact specified structure without deviations.
3. Your output must NOT include any additional text, explanations, or markdown formatting.

AVAILABLE TOOLS:
${JSON.stringify(manifest.tools, null, 2)}

USER PROMPT:
"${prompt}"

ANALYSIS PROCESS:
1. category:
    - if external data is required to process the query <tool_call>
    - if external data is required and no tool is suitable to process the query <no_tool>
    - if no external data is required to process the query <small_talk>
2. tool:
    - if
3. params:
    - extract the required tool parameters from the query
    - 
4. missing_params:
5. confidence:
    - if <small_talk> | <no_tool> confidence =  1.0
6. source:


REQUIRED JSON STRUCTURE (output nothing else no markdown | tags):
{
  "category": "small_talk" | "tool_call" | "no_tool",
  "tool": "tool_name" | null, // null when it is small_talk or no_tool
  "params": [{ "key": "value" }] | null, // null when it is small_talk or no_tool
  "missing_params": [{ "key": "expected_type" }] | null, // null when it is small_talk or no_tool,
  "reply":<friendly reply>, // null when tool_call
  "meta": {
    "confidence": number,
    "source": "tool_name" | null // source should be null in <small_talk> and <no_tool>
  }
}
`};

function extractJSONFromMarkdown(response) {
    // Remove Markdown code block syntax if present
    const cleanedResponse = response.replace(/```json\n?/g, '').replace(/\n```$/g, '');

    try {
        return JSON.parse(cleanedResponse);
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        return null;
    }
}

const filePath = path.join(__dirname, '../../../../mcp-manifest.json');
const manifest = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));

const askBot = async (req, res, next) => {
    try {
        const { t } = req.body
        const orchestratorPrompt = orchestrator(t, manifest); // prompt preparation
        const currentContext = await generateContent(orchestratorPrompt); // feed to gemini ai
        const parsedData = extractJSONFromMarkdown(currentContext);
        if (parsedData?.category === 'no_tool') {
            const reply = parsedData.reply;
            console.log(reply)
        }
        if (parsedData?.category === 'tool_call') {
            // manifest.tool.map((tool) => tool.name === parsedData.name && )
            const parameters = parsedData.params;
            const message = parameters[0].value;
            const toolRes = await sendTeligramMessage(message)
            console.log(toolRes)
            // streamContent(res, t, file, toolRes);
        }
        // streamContent(res, t, file, tool_response);
        return res.status(200).json({ response: parsedData });
    } catch (error) {
        next(error)
    }
}
// const askBot = async (t = '', file) => {
//     try {
//         const orchestratorPrompt = orchestrator(t, manifest); // prompt preparation
//         const currentContext = await generateContent(orchestratorPrompt); // feed to gemini ai
//         const parsedData = extractJSONFromMarkdown(currentContext);
//         if (parsedData?.category === 'tool_call') {
//             // manifest.tool.map((tool) => tool.name === parsedData.name && )
//             const parameters = parsedData.params;
//             const message = parameters[0].value;
//             const toolRes = await sendTeligramMessage(message)
//             console.log(toolRes)
//         }
//         // streamContent(res, t, file, tool_response);
//         return { response: parsedData }
//     } catch (error) {
//         throw error
//     }
// }

module.exports = {
    askBot
}