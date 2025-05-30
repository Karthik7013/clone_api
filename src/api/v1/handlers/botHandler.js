const { marked } = require("marked");

const askBot = async (req) => {
    try {
        const URI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const { t } = req.body;
        const preFetchBody = `
You are an intelligent, context-aware AI assistant helping a user through an ongoing conversation.

Below is the relevant memory context from previous interactions:

User Memory Context:
name:sarah

The user is now asking:
${t}

Your task:
Generate a response that is:
- Personalized based on memory and query
- Factually accurate
- Relevant to both the current user query and historical context

Response Rules:
1. Use the memory context to enhance understanding, but avoid repeating it word-for-word unless the user explicitly refers to it.
2. Maintain a natural and conversational tone. Match the user's emotional tone and style if available.
3. Respect any user goals mentioned in memory, and progress toward those goals.
4. Do not hallucinate or assume facts not in memory or the current query.
5. Keep the response focused — avoid generic or overly verbose answers.
6. If the user query is ambiguous or lacks enough detail, ask a concise clarifying question.

🧠 **Proactive Rule:**
7. **Calculate and suggest the next logical step or improvement** based on the user's last question, current goal, or previous challenges.
    - If the user asked for help (e.g., “Can you fix X?”), recommend actionable steps.
    - If the user is learning something, suggest what to learn or explore next.
    - If the user is troubleshooting, suggest diagnostics or optimizations.
    - If there's a past issue or pattern, guide them forward accordingly.

Privacy & Safety Rules:
8. Do not reference personal or sensitive details unless they are directly relevant and contextually appropriate.
9. Always generate helpful, safe, and respectful responses.

Final Output:
Generate a thoughtful reply following all the above rules.
        `
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
            method: 'POST',  // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json'  // Set the Content-Type to JSON
            },
            body: JSON.stringify(requestBody)  // Stringify the request body to send as JSON
        })
        const markDown = await response.json();
        const data = marked.parse(markDown.candidates[0].content.parts[0].text);
        return { response: data }
    } catch (error) {
        throw error
    }
}

module.exports = {
    askBot
}