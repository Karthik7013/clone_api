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


// prompt builder
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
    console.log(prompt)
    return prompt;
}

const askBot = async (req) => {
    try {
        const URI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const { t } = req.body;
        const preFetchBody = await promptBuilder(t);
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
        console.log(data)
        return { response: data.candidates[0].content.parts[0].text }
    } catch (error) {
        throw error
    }
}

module.exports = {
    askBot
}