const Router = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const successHandler = require('../../middleware/successHandler');
const botRoutes = Router();
const botHandler = require('../handlers/botHandler');

// Replace with your Gemini Free API key
const API_KEY = "AIzaSyD8KA05lvgM3UIlF3hPcmbBPY8zV5lQsgA";

// Initialize the client
const genAI = new GoogleGenerativeAI(API_KEY);

// Choose a free model
const MODEL = "gemini-1.5-flash"; // fast & free tier


botRoutes.post('/ask', async (req, res, next) => {
    try {
        const { t, model } = req.body;
        const response = await botHandler.askBot(t);
        return res.status(200).json(
            successHandler(response,
                "Bot Response",
                200
            )
        )
    } catch (error) {
        next(error)
    }
})

const delayFunction = (delay = 1000) => {
    return new Promise(resolve => setTimeout(resolve, delay));
};

botRoutes.post('/generative', async (req, res, next) => {
    const { t } = req.body;
    try {
        // res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive');
        for (let i = 1; i <= 5; i++) {
            res.write(`Chunk ${i}\n`);
            await new Promise(r => setTimeout(r, 3000)); // simulate delay
        }
        res.end('end')
    } catch (error) {
        next(error);
    }
});


module.exports = botRoutes;



