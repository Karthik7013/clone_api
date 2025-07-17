const { connectToSassProduct } = require("../../config/db");

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

const chatAssistant = async (t) => {

    return `📘 **Memory Source:**
The assistant is engaged in an ongoing, context-aware conversation with the user. The assistant has access to persistent memory, which may include relevant background information:

**User Memory:**
- [Firstly, Computer Networking is the technological backbone that allows electronic devices to connect, communicate, and share data. This invisible infrastructure is fundamental to everything digital, enabling global communication (like email and video calls), resource sharing (printers, files), and access to the vast information on the internet. It operates through physical connections or wireless signals, governed by specific rules called protocols (e.g., TCP/IP), and relies on components like routers, switches, and servers. You've rightly pointed out common types like LANs, WANs, and the Internet as the largest example.

Secondly, Professional Networking focuses on building human relationships for career or business growth. This involves exchanging information, advice, and opportunities with others, a crucial skill in its own right, though not technical.

Your text effectively assumes a focus on computer networking, recognizing it as a "vast and fascinating field" and "the backbone of our connected world."]

---

🧾 **User Query:**
${t}

---

🎯 **Instructions:**

1. Review the user memory and current query.
2. Generate a personalized, emotionally intelligent, and well-informed response.
3. The reply must be:
   - **Factually accurate**
   - **Relevant** to both the user’s message and their stored memory
   - **Conversational** and emotionally attuned to the user’s tone and intent
   - **Supportive** of the user’s goals, needs, or current context
4. Include a proper **title** as a Markdown H2 heading (##), clearly summarizing the theme or purpose of your response.

#### Response Guidelines:
- Personalize the tone using memory, but do not repeat memory verbatim unless the user refers to it directly.
- Mirror the user’s communication style — whether it is professional, casual, emotional, inquisitive, etc.
- If the user has previously expressed goals, preferences, or challenges, reflect those in the response.
- Avoid generic or filler content — every part of the reply should be intentional and helpful.
- Use emojis when they **enhance tone or clarity** 😊 (but keep it natural and minimal).
- Anticipate likely follow-up questions and proactively answer them when possible.
- Ensure clarity and completeness without being unnecessarily long.
- Break down complex ideas or next steps into easy-to-understand insights or guidance.

---

🪄 **Additional Task – Suggest a Next Step:**

After providing the main response:

- Add a short **Next Step or Friendly Suggestion** section.
- This should be relevant to what the user is trying to do, solve, or understand.
- Make it **actionable**, **concise**, and aligned with the user’s current context.
- Keep the tone positive and motivating — like a helpful guide or thoughtful coach.

---

📄 **Output Format** (Use this exact structure in your reply):

## [Your Personalized Title Here]

[Thoughtful, personalized response to the user based on their query and memory.]

---

### Next Step or Friendly Suggestion
- [Offer a concise, encouraging next action or helpful insight.]

---

*Note: This response is uniquely tailored based on the user's memory and current conversation context. Always respond with clarity, empathy, and purpose.*
`};

const premium = true;
let default_model = 'models/gemini-2.5-flash-lite-preview-06-17'
const askBot = async (req) => {
    try {
        model = req.body.model || default_model;
        const URI = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const { t } = req.body;
        const preFetchBody = !premium ? await promptBuilder(t) : await chatAssistant(t);
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: preFetchBody
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
        })
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message || 'An error occurred while processing your request.');
        }
        return { response: data.candidates[0].content.parts[0].text }
    } catch (error) {
        throw error
    }
}

module.exports = {
    askBot
}