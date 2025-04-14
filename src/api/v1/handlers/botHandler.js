const { marked } = require("marked");

const askBot = async (req) => {
    try {
        const URI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const { t } = req.body;

        const preFetchBody = `
        - you are my chatbot.
        - this is a insurance app.
        - you need to give response on insurance related information.
        - if it is not related to insurance information.
        - give response as sorry i can give you the information.pls contact Customer Care.
        - this is my query : ${t}`;

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