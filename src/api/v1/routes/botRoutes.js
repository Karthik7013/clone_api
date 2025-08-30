const Router = require('express');
const successHandler = require('../../middleware/successHandler');
const botRoutes = Router();
const botHandler = require('../handlers/botHandler');
const { streamContent } = require('../service/gemini');


botRoutes.post('/ask1', async (req, res, next) => {
    try {
        const { t, file } = req.body;
        const response = await botHandler.askBot(t, file);
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



botRoutes.post('/ask', async (req, res, next) => {
    try {
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Cache-Control', 'no-cache');
        const { t } = req.body;
        streamContent(res, t)
    } catch (error) {
        next(error)
    }
});


module.exports = botRoutes;



