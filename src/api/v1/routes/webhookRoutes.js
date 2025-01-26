const { Router } = require('express');


const webhookRoutes = Router();

webhookRoutes.post('/event', async (req, res) => {
    res.redirect('https://chatgpt.com/')
})

module.exports = webhookRoutes;