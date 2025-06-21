const { marked } = require("marked");
// my faq's
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

const getPreviousContext = () => {
    return ''
}

// prompt builder
const promptBuilder = async (query) => {
    const faqs = await getMyFaqs();
    const instructions = instructionBuilder();
    const previousContext = getPreviousContext();
    const prompt = `You are a helpful, knowledgeable AI assistant trained to respond only using the following uploaded FAQs from a business.

Your goal is to answer customer questions accurately using the provided knowledge, and never guess or hallucinate.

Below is the list of FAQs the user has uploaded:

${faqs}

Here is the current user query:
${query}

Instructions:
${instructions}

Now craft the best response for the user’s message in a readme format.`
    const prompt1 = `
You are a helpful and knowledgeable AI assistant designed to respond *only* using the information provided in the uploaded FAQ file. Do not answer from general knowledge or external sources, and never guess or hallucinate.

---

📘 **Knowledge Source:**
All answers must be strictly derived from the following uploaded FAQs:
${faqs}

---

🧾 **User Query:**
${query}

---

🎯 **Instructions:**

1. Search the uploaded FAQ content for the most accurate and relevant answer(s) to the user’s query.
2. If a matching answer is found, respond using **clear, concise markdown format** as specified below.
3. If **no relevant answer is found**, respond with:
   > _“Thank you for your question. Unfortunately, I couldn’t find an answer based on the current FAQ information. Please contact our support team for more help.”_

4. Do **not** use any external knowledge, assumptions, or invented information.
5. Maintain a helpful and professional tone.
6. Avoid repeating the question unless necessary for clarity.
7. If multiple FAQ entries apply, summarize them without redundancy.
8. Ensure the final output is in proper **README.md style Markdown**, using appropriate headings, bullet points, code blocks, etc., as necessary.

---

📄 **Output Format** (Always in README Markdown style):

[Your response should look like this:]

## Title

[Your precise Title here]

## Answer

[Your precise answer here]

### Related Information
- [Optional related FAQ entries or tips, if applicable]

---

*Note: This answer is based solely on our current FAQ data.*
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
        const markDown = await response.json();
        const data = marked.parse(markDown.candidates[0].content.parts[0].text);
        return { response: data, text: markDown.candidates[0].content.parts[0].text }
    } catch (error) {
        throw error
    }
}

module.exports = {
    askBot
}