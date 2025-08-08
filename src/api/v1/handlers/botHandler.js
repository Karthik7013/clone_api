const { connectToSassProduct } = require("../../config/db");
const { setCache, generateCacheKey, getCache } = require("../../utils/cache");
const path = require('path');
const fs = require('node:fs');
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


// const generateContent = async () => {
//     const res = await 
// }


const default_model = 'models/gemini-2.5-flash-lite-preview-06-17';

const generatePrompt = async (t, prevContext) => {
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

const summarizeApi = async (currentContext = '', prevContext = '') => {

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
    const URI = `https://generativelanguage.googleapis.com/v1beta/${default_model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
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
        })  // Stringify the request body to send as JSON
    })
    const data = await response.json(prompt);
    return data.candidates[0].content.parts[0].text || ''
}

const askBot = async (t = '', model = default_model) => {
    try {
        const URI = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const prevContext = await getCache('memory:user:context') || '';
        const prompt = await generatePrompt(t, prevContext);
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        };
        const response = await fetch(URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Set the Content-Type to JSON
            },
            body: JSON.stringify(requestBody)  // Stringify the request body to send as JSON
        });
        const data = await response.json();
        const currentContext = data.candidates[0].content.parts[0].text || '';
        const updatedContext = await summarizeApi(currentContext, prevContext);
        await setCache(generateCacheKey('memory', 'user', 'context'), updatedContext, 3000)
        if (data.error) {
            throw new Error(data.error.message || 'An error occurred while processing your request.');
        }
        return { response: currentContext }
        // return { response: await generativeAI() }
    } catch (error) {
        throw error
    }
}



const generativeAI = async (query = 'send message to teligram bot like "hai" message', model = default_model) => {
    const URI = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const filePath = path.join(__dirname, '../../../../mcp-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
    const toolSelectPrompt = `You are an intelligent routing system. You are connected to the following tools:

    ${JSON.stringify(manifest.tools, null, 2)}

    A user has asked the following question:
    "${query}"

    Your task:
    1. Carefully analyze the user question.
    2. Choose the single best tool from the tools list.
    3. Extract the required parameters based on the tool’s expected inputs.
    4. Return ONLY a JSON object in this exact format (no explanation, no extra text, no code block formatting, no backticks, just plain JSON):

    {
        "tool": "toolName",
        "parameters": {
                "param1": "value1",
                "param2": "value2"
        }
    }

    Rules:
    - Do not return anything except the JSON object.
    - The "tool" must exactly match one of the tool names in the tools list.
    - The "parameters" must exactly match the expected keys for that tool.
    - If required values are not present in the question, leave them empty ("").

    Respond now with only the JSON.
`;
    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: toolSelectPrompt
                    }
                ]
            }
        ]
    };
    const response = await fetch(URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Set the Content-Type to JSON
        },
        body: JSON.stringify(requestBody)  // Stringify the request body to send as JSON
    });
    const data = await response.json();
    const currentContext = data.candidates[0].content.parts[0].text || '';
    const selectedTool = JSON.parse(currentContext);
    const tool = manifest.tools.find((t) => t.name === selectedTool.tool);

    // const toolResponse = fetch(tool.endpoint, {
    //     method: tool.method,
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(selectedTool.parmeters)
    // });
    const toolResult = 'Message send successfully' // make api call dynamically

    // Step 3: Ask Gemini to format final answer
    const formatPrompt = `
    User asked: "${query}"
    Tool result: ${JSON.stringify(toolResult)}
    Please respond in a friendly, natural sentence.
  `;
    const requestBody1 = {
        contents: [
            {
                parts: [
                    {
                        text: formatPrompt
                    }
                ]
            }
        ]
    };
    const response1 = await fetch(URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Set the Content-Type to JSON
        },
        body: JSON.stringify(requestBody1)  // Stringify the request body to send as JSON
    });
    const data1 = await response1.json();
    const resq = data1.candidates[0].content.parts[0].text || ''
    return resq;
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


 */