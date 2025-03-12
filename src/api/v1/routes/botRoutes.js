const Router = require('express');
const successHandler = require('../../middleware/successHandler');
const botRoutes = Router();
const marked = require('marked');

botRoutes.post('/ask', async (req, res, next) => {
    try {
        const URI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const { t } = req.body;
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: t
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
        const data = marked.parse(markDown);

        return res.status(200).json(
            successHandler({ response: data.candidates[0].content.parts[0].text },
                "Bot Response",
                200
            )
        )

    } catch (error) {
        next(error)
    }
})

module.exports = botRoutes;




