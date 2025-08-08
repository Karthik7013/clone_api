const { connectToSassProduct } = require("../../config/db");
const { setCache, generateCacheKey, getCache } = require("../../utils/cache");
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


const default_model = 'models/gemini-2.5-flash-lite-preview-06-17'

// prevContext+currentQuery -> original prompt
const chatAssistant = async (t, prevContext) => {
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

const summarizeApi = async (context = '', prevContext = '') => {

    const prompt = `
    **Conversation Summarization Task**
*Create a condensed context snapshot for future chatbot interactions*

### Inputs:
1. **Previous Summary** (${prevContext})  
2. **Current Response** (${context})

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

const askBot = async (req) => {
    try {
        const model = req.body.model || default_model;
        const URI = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const { t } = req.body;
        const prevContext = await getCache('memory:user:context') || '';
        const prompt = await chatAssistant(t, prevContext);
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
        const summerizeResponse = await summarizeApi(data.candidates[0].content.parts[0].text, prevContext);
        await setCache(generateCacheKey('memory', 'user', 'context'), summerizeResponse, 3000)
        if (data.error) {
            throw new Error(data.error.message || 'An error occurred while processing your request.');
        }
        return { response: data.candidates[0].content.parts[0].text }
    } catch (error) {
        throw error
    }
}



const gemini = async ({
    query
}) => {

}

module.exports = {
    askBot
}