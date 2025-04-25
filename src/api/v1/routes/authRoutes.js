const { Router } = require('express');
const authHandler = require("../handlers/authHandler");
const successHandler = require('../../middleware/successHandler');
const { getCookie, setCookie } = require('../../utils/cookies');
const authRoutes = Router();


authRoutes.post('/customer', async (req, res, next) => {
    try {
        const response = await authHandler.verfiyCustomer(req);
        if (req.body.method === 'SEND') {
            setCookie(res, 'otpSessionId', response.messageId, {
                maxAge: 5 * 60 * 1000  // 5 minutes
            })
            return res.status(200).json(successHandler(response, "OTP sent successfully", 200))
        } else {
            const key = "otpSessionId"
            const messageId = getCookie(req, key);
            const { otp } = req.body;
            const response = await verifyOtp(otp, messageId);
            // verify cookies
            return res.status(200).json(successHandler(response, "OTP verified successfully", 200))
        }
    } catch (error) {
        next(error)
    }
})

authRoutes.post('/agent', async (req, res, next) => {
    try {
        const response = await authHandler.verfiyAgent(req);
        return res.status(200).json(successHandler(response, "some msg", 200));
    } catch (error) {
        next(error)
    }
})


authRoutes.post('/employee', async (req, res, next) => {
    try {
        const response = await authHandler.verfiyEmployee(req);
        return res.status(200).json(successHandler(response, "some msg", 200));
    } catch (error) {
        next(error)
    }
})
authRoutes.post('/signOut', async (req, res, next) => {
    try {
        const response = await authHandler.signOut();
        return res.status(200).json(successHandler(response, "some msg", 200));
    } catch (error) {
        next(error)
    }
})

authRoutes.post('/generate-access-token', async (req, res, next) => {
    try {
        const response = await authHandler.getAccessToken(req);
        return res.status(200).json(successHandler(response, "some msg", 200));
    } catch (error) {
        next(error)
    }
})

module.exports = authRoutes;