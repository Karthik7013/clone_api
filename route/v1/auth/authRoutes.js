const { Router } = require('express');
const { verfiyAgent,
    verfiyCustomer,
    verfiyEmployee,
    createCustomer,
    createAgent,
    createEmployee,
    getAccessToken,
    signOut
} = require('../../../controller/authController');

const authRoutes = Router();

authRoutes.post('/signup/customer', createCustomer)
authRoutes.post('/signup/agent', createAgent)
authRoutes.post('/signup/employee', createEmployee)

authRoutes.post('/customer/verify', verfiyCustomer)
authRoutes.post('/agent/verify', verfiyAgent)
authRoutes.post('/employee/verify', verfiyEmployee)

authRoutes.post('/signOut', signOut)

authRoutes.post('/sendOtp', async (req, res) => {
    try {
        const res1 = await fetch('https://www.tataaig.com/lambda/prod-genericService/sendOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ensures the server knows the data format
            },
            body: JSON.stringify(req.body), // Stringify the request body
        });

        // Check if the response is successful
        if (!res1.ok) {
            const errorData = await res1.json();
            return res.status(res1.status).json({
                message: 'Failed to send OTP',
                error: errorData,
            });
        }

        const data = await res1.json(); // Parse JSON response
        res.status(200).json({
            message: 'OTP sent successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({
            message: 'An error occurred while sending OTP',
            error: error.message,
        });
    }
});

authRoutes.post('/generate-access-token', getAccessToken)

module.exports = authRoutes;