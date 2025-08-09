const Router = require('express');
const successHandler = require('../../middleware/successHandler');
const botRoutes = Router();
const botHandler = require('../handlers/botHandler');

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

module.exports = botRoutes;




