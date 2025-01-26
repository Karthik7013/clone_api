const { Router } = require("express");

const smsRoutes = Router();

smsRoutes.post('/sms/sendOtp', async (req, res, next) => {
    try {
        const phno = req.body.phno;
        if (!phno) {
            const err = new Error("Phone number is requried !");
            err.status = 400;
            next(err);
        }
        res.status(200).json({ message: "otp send successfully", otp: "111111" })
    } catch (error) {
        error.status = 500;
        return next(error)
    }
})

smsRoutes.post('/sms/verifyOtp', async (req, res, next) => {
    try {
        const { verify_code } = req.body;
        console.log(verify_code)
        if (!verify_code) {
            const err = new Error("otp is required !");
            err.status = 400;
            return next(err);
        }
        res.status(200).json({ message: 'otp verified successfully' })
    } catch (error) {
        error.status = 500;
        next(error)
    }
})



module.exports = smsRoutes;