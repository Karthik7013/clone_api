// my faq's -> db faq's
const my_faqs = [
    {
        "question": "What is your return policy?",
        "answer": "We accept returns within 30 days of purchase."
    },
    {
        "question": "Do you ship internationally?",
        "answer": "Yes, we ship to over 50 countries."
    },
    {
        "question": "How do I track my order?",
        "answer": "You can track your order using the tracking link sent to your email."
    }
]

// get faq's and formatt
const getMyFaqs = async () => {
    const faqs = my_faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n');
    return faqs;
}

// instructions
const instructionBuilder = () => {
    return `1. Only respond using the content from the FAQs above. Do NOT use outside knowledge or assumptions.
2. If the answer cannot be found in the provided information, respond with:
   "I'm sorry, I can only answer based on the provided FAQs."
3. Be clear and concise, and match the tone of a professional support assistant.
4. If relevant, add a friendly tone without being overly casual.
5. Avoid repeating the full question unless needed for clarity.
`
}

// prompt builder
const promptBuilder = async (query) => {
    const faqs = await getMyFaqs();
    const instructions = instructionBuilder();
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
        return { response: data.candidates[0].content.parts[0].text }
    } catch (error) {
        throw error
    }
}

module.exports = {
    askBot
}