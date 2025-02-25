const { Router } = require('express');
const { verfiyAgent,
    verfiyCustomer,
    verfiyEmployee,
    createCustomer,
    createAgent,
    createEmployee,
    getAccessToken,
    signOut
} = require('../controller/authController');
const { sendOtp, verifyOtp } = require('../controller/smsController');
const { customerAuthHandler } = require('../handler/authHandler');
const successHandler = require('../../middleware/successHandler');

const authRoutes = Router();

authRoutes.post('/signup/customer', createCustomer)
authRoutes.post('/signup/agent', createAgent)
authRoutes.post('/signup/employee', createEmployee)

authRoutes.post('/customer/verify', async (req, res, next) => {
    try {
        const response = await customerAuthHandler(req);
        const {
            accessToken,
            refreshToken,
            role
        } = response;
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 3600000,
            secure: process.env.NODE_ENV === 'PRODUCTION',
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 900000,
            secure: process.env.NODE_ENV === 'PRODUCTION',
        });

        res.cookie('role', role, {
            httpOnly: true,
            maxAge: 3600000,
            secure: process.env.NODE_ENV === 'PRODUCTION',
        });
        return res.status(200).json(successHandler(response, "Login Success",
            200))
    } catch (error) {
        next(error)
    }
}
)
authRoutes.post('/agent/verify', verfiyAgent)
authRoutes.post('/employee/verify', verfiyEmployee)

authRoutes.post('/signOut', signOut)

authRoutes.post('/sendOtp', sendOtp);
authRoutes.post('/verifyOtp', verifyOtp);

authRoutes.post('/generate-access-token', getAccessToken)

module.exports = authRoutes;