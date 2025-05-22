const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authHandler = require("../handlers/authHandler");
const successHandler = require('../../middleware/successHandler');
const { getCookie, setCookie, clearCookie } = require('../../utils/cookies');
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRES
const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRES;
const authRoutes = Router();


authRoutes.post('/customer', async (req, res, next) => {
    try {
        const { method } = req.body;
        switch (method) {
            case 'SEND':
                const { user } = req.body; // phone is key - value is email/phone
                if (!user) {
                    const customerErr = new Error("Customer Phone/Email Number is Required !");
                    throw customerErr;
                }
                // get user with the email/phone and send OTP
                const response = await authHandler.sendCustomer(user);

                // set cookie
                setCookie(res, 'otpSessionId', response.messageId, {
                    maxAge: 2 * 60 * 1000  // 2 minutes
                })
                return res.status(200).json(successHandler(response, "OTP sent successfully", 200));

            case 'VERIFY':
                const { otp } = req.body;
                if (!otp) {
                    const customerErr = new Error("Enter OTP !");
                    throw customerErr;
                }
                const key = "otpSessionId"
                const messageId = getCookie(req, key);
                const response1 = await authHandler.verifyCustomer(otp, messageId);
                clearCookie(res, key);

                // verify cookies
                const accessToken = jwt.sign(response1, jwtSecretKey, { expiresIn: accessTokenExpire });
                const refreshToken = jwt.sign(response1, jwtRefreshSecretKey, { expiresIn: refreshTokenExpire });

                const payload = {
                    accessToken,
                    exp: accessTokenExpire,
                    role: 'customer',
                }
                setCookie(res, 'accessToken', accessToken, {
                    maxAge: 15 * 60 * 1000  // 15 minutes
                })
                setCookie(res, 'refreshToken', refreshToken, {
                    maxAge: 60 * 60 * 1000  // 60 minutes
                })
                return res.status(200).json(successHandler(payload, "Login Successfully", 200))
            default:
                const notImplement = new Error("Not Implemented")
                notImplement.status = 501;
                throw notImplement;
        }
    } catch (error) {
        next(error)
    }
})

// authRoutes.post('/agent', async (req, res, next) => {
//     try {
//         const response = await authHandler.verfiyAgent(req);
//         return res.status(200).json(successHandler(response, "some msg", 200));
//     } catch (error) {
//         next(error)
//     }
// })

// authRoutes.post('/employee', async (req, res, next) => {
//     try {
//         const response = await authHandler.verfiyEmployee(req);
//         return res.status(200).json(successHandler(response, "some msg", 200));
//     } catch (error) {
//         next(error)
//     }
// })

authRoutes.post('/signOut', async (req, res, next) => {
    try {
        const response = await authHandler.signOut(res);
        return res.status(200).json(successHandler(response, "Logout successfully !", 200));
    } catch (error) {
        next(error)
    }
})

authRoutes.post('/generate-access-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies
        const accessToken = await authHandler.generateAccessToken(refreshToken);
        setCookie(res, 'accessToken', accessToken, {
            maxAge: 1 * 60 * 1000  // 15 minutes
        })
        return res.status(200).json(successHandler(accessToken, "New Access Token", 200));
    } catch (error) {
        next(error)
    }
})

module.exports = authRoutes;