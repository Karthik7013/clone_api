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
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Transfer-Encoding': 'chunked',
            'X-Accel-Buffering': 'no', // 🔥 CRITICAL: Disables Nginx-like proxy buffering
        });
        const { t } = req.body;
        streamContent(res, t)
    } catch (error) {
        next(error)
    }
});


module.exports = botRoutes;



