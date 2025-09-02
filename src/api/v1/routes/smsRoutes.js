const { Router } = require("express");
const smsHandler = require("../handlers/smsHandler");
const successHandler = require("../../middleware/successHandler");

const smsRoutes = Router();

smsRoutes.post('/sendOtp', async (req, res, next) => {
    try {
        const response = await smsHandler.sendOtp(req);
        return res.status(200).json(successHandler(response, 'Otp Send Successfully', 200))
    } catch (error) {
        next(error);
    }
})

smsRoutes.post('/verifyOtp', async (req, res, next) => {
    try {
        const response = await smsHandler.verifyOtp(req);
        return res.status(200).json(successHandler(response, 'Otp Verified Successfully', 200))
    } catch (error) {
        next(error);
    }
})

module.exports = smsRoutes;