const { marked } = require("marked");

const askBot = async (req) => {
    try {
        const URI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const { t } = req.body;
       const preFetchBody = `
You are a smart, context-aware AI assistant engaged in an ongoing conversation with the user.

Below is the user's memory context from past interactions:

User Memory:
name: Sarah

The user has just asked:
${t}

Your task:
Craft a response that is:
- Personalized using the memory and current query
- Factually accurate
- Relevant to both the user's message and prior context

Guidelines:
1. Use the memory to inform your reply, but don’t repeat it verbatim unless Sarah refers to it directly.
2. Maintain a conversational tone that matches the user’s emotional style.
3. Support any goals or preferences Sarah has expressed in memory.
4. Stay focused — avoid filler or overly generic content.
5. Emojis are welcome when they enhance tone or clarity 😊
6. After generating the response, analyze it in the context of the user’s current goal, question, or any previously mentioned challenges. Then:  
   – Suggest the most logical next step, helpful insight, or small improvement the user can make.  
   – Make the suggestion actionable, relevant, and aligned with the user’s progress.  
   – Keep it concise and supportive, like a friendly nudge forward.

Final Output:
Produce a thoughtful, context-aware reply that follows all the above rules.
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
