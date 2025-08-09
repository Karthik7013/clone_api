const { connectToSassProduct } = require("../../config/db");
const { setCache, generateCacheKey, getCache } = require("../../utils/cache");
const path = require('path');
const fs = require('node:fs');
const default_model = 'models/gemini-2.5-flash-lite-preview-06-17';
// ---------------------------| |---------------------- //
// get faq's and formatt
const getMyFaqs = async (chatbot_id = 2) => {
    try {
        const connection = await connectToSassProduct();
        const [result] = await connection.execute(`select * from faqs where chatbot_id = ${chatbot_id}`);
        const faqs = result.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n');
        return faqs;
    } catch (error) {
        throw error;
    }
}
// prompt builder for support ai
const promptBuilder = async (query) => {
    const faqs = await getMyFaqs();
    const prompt = `
You are a helpful and knowledgeable AI assistant for a organization. Your job is to respond to user queries **strictly** based on the information from the uploaded FAQ content below.

⛔ Do **not** use general knowledge, personal opinions, or external data. Do **not** make assumptions or hallucinate any answer.

---
 **Organization Details**:
 name: KarthiTechSolution.ptv.lmtd
 support_email: karthiktumala143gmail.com
📘 **Knowledge Source (FAQs)**:
${faqs}

---

🧾 **User Query**:
${query}

---

🎯 **Instructions**:

1. Search the above FAQs for the most accurate and relevant information related to the user's query.
2. Respond using the **README.md Markdown style** (with headings, bullet points, and optional emojis for readability).
3. If a relevant FAQ is found:
   - Rephrase it naturally in a helpful and friendly tone.
   - DO NOT copy-paste the FAQ text as-is.
   - Keep the response human-like and readable.
4. If **no relevant information is found**, respond with:
## [emoji reaction] [use a fallback message]

[Thanks for your question!]
Unfortunately, we couldn't find an answer.

### [emoji reaction] What You Can Do Next:
- Try rephrasing your question for better results.
- Reach out to our support team — we're happy to assist!

### [emoji reaction] Contact Support
If you need direct help, please email us at:  
**[support@yourcompany.com](mailto:support@yourcompany.com)**
5. Keep the answer short, direct, and clean — avoid repeating the question.
6. If multiple related FAQs apply, summarize them into a single cohesive answer.

---

📝 **Response Format (README-style Markdown)**:

## [emoji reaction] Title

*[A short, clear, rephrased title summarizing the topic]

[Write the user-friendly, helpful answer here in a natural tone.]

### [emoji reaction] Most Asked
- [pick most asked faq's from the above and offer to ask.]
`;
    return prompt;
}

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
        return data.candidates[0].content.parts[0].text || ''
    } catch (error) {
        throw error;
    }
}

const generatePrompt = (t, prevContext) => {
    return `
    📘 **Memory & Context**
I retain persistent memory of our conversation. Relevant background:
**Your Memory:**
- [${prevContext}]

---

🧾 **Current Query**  
${t}

---

🎯 **Response Requirements**  
1. **Personalization**  
   - Weave memory into responses naturally (no verbatim repetition)  
   - Mirror user's tone/style (professional/casual/emotional)  
2. **Quality Standards**  
   - ✅ 100% factually accurate  
   - 🔍 Anticipate unasked questions  
   - ❤️ Emotionally intelligent & supportive  
   - ✂️ Zero fluff/generic phrases  
3. **Structure**  
   - ## [Creative Title] (Markdown H2)  
   - 💭 **Live Thinking** section (concise bullet insights)  
   - 📄 **Main Response** (personalized, actionable content)  
   - ➡️ **Next Step** (Multiple actionable suggestion)

---

💡 **Enhanced Response Strategy**  
**Live Thinking Components:**  
> 🔗 **Context Hook**  
> - "Connecting [memory snippet] to [query element] because..."  
> - "Noticing [tone/priority] from your history..."  
>  
> 🧠 **Knowledge Synthesis**  
> - "Evaluating via [framework] | Comparing [option A/B] | Validating with [source]"  
> - "Flagging caveat: [limitation/bias]"  

**Response Flow:**  
1. Open with empathy/acknowledgement  
2. Deliver value-dense insights  
3. Break complexity into scannable steps  
4. End with motivating next step  

**Prohibitions:**  
- ❌ Memory dumps  
- ❌ Unverified claims  
- ❌ Overused emojis (max 3/reply)

---

📄 **Output Format**  
## [Title - Max 6 words]  

💭 **Live Thinking**  
> 🔗 [Context insight]  
> 🧠 [Analysis insight]  
> ⚠️ [Validation note]  

[Conversational response addressing all query layers. Uses:  
- "You" statements  
- Memory-linked personalization  
- Scannable formatting (bullets/dashes)  
- Strategic emojis]  

---

### ➡️ Next Step  
- [Multiple action: Specific, executable, <4 actions]
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

const askBot = async (t = '') => {
    try {
        const prevContext = await getCache('memory:user:context') || ''; // prev context from redis
        const prompt = generatePrompt(t, prevContext); // prompt preparation
        const currentContext = await generateContent(prompt); // feed to gemini ai
        const summPrompt = summarizePrompt(currentContext, prevContext); // prompt preparation
        const updatedContext = await generateContent(summPrompt); // feed to gemini ai
        await setCache(generateCacheKey('memory', 'user', 'context'), updatedContext, 3000) // store the updated
        return { response: currentContext }
    } catch (error) {
        throw error
    }
}

const generativeAI = async (query = '') => {
    try {
        const filePath = path.join(__dirname, '../../../../mcp-manifest.json');
        const manifest = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
        const toolSelectPrompt = `You are an intelligent routing system. You are connected to the following tools:

${JSON.stringify(manifest.tools, null, 2)}

A user has asked the following question:
"${query}"

Your task:
1. First, decide if the query explicitly and unambiguously requires the function described in one of the tools above.
   - The tool’s function must match the request exactly in purpose.
   - If the match is not exact, or the request does not clearly call for that tool’s described use, treat it as no match.
   - Do NOT select a tool just because it is the only one available or because the query contains text that could be sent.
2. If a match is found, extract the parameters exactly as listed in the tool definition.
3. If no match is found, return the "no tool found" format.

Return ONLY one of the following JSON formats — no extra keys, no explanations, no deviations:

Format A (tool found):
{
    "tool": "toolName",
    "parameters": {
        "param1": "value1",
        "param2": "value2"
    }
}

Format B (no tool found):
{
    "tool": "",
    "parameters": {}
}

STRICT RULES:
- The "tool" must exactly match a tool name from the list, or be "".
- Parameters must exactly match the names in the tool’s definition; missing values must be "".
- Never guess or loosely match — if uncertain, use Format B.
- Output must be exactly one JSON object in one of the two formats above.

Respond now with only the JSON.
`;
        const currentContext = await generateContent(toolSelectPrompt);
        const selectedTool = JSON.parse(currentContext);
        console.log(selectedTool, "selected tool")
        const tool = manifest.tools.find((t) => t.name === selectedTool.tool);
        if (!tool || tool.name === '') {
            throw new Error('No tool is there to solve the questions.')
        }

        const toolResult = await fetch(tool.endpoint, {
            method: tool.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedTool.parameters)
        });
        const res4 = await toolResult.json();

        // Step 3: Ask Gemini to format final answer
        const formatPrompt = `
    User asked: "${query}"
    Tool result: ${JSON.stringify(res4)}
    Please respond in a friendly, natural sentence.
  `;
        const resq = await generateContent(formatPrompt);
        return resq;
    } catch (error) {
        throw error
    }
}

module.exports = {
    askBot,
    generativeAI
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


 */