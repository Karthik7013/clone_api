const successHandler = require('../middleware/successHandler')
const sendOtp = async (req, res, next) => {
    try {
        const otpRes = await fetch('https://www.tataaig.com/lambda/prod-genericService/sendOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        })

        if (!otpRes.ok) {
            const errorData = await otpRes.json();
            return res.status(otpRes.status).json({
                message: 'Failed to send OTP',
                error: errorData,
            });
        }

        const data = await otpRes.json();
        res.status(200).json(successHandler(data, 'OTP sent successfully', 200));
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({
            message: 'An error occurred while sending OTP',
            error: error.message,
        });
    }
}


const verifyOtp = (req, res, next) => {
    res.send(successHandler({}, 'Otp verified successfull', 200))
}
module.exports = { sendOtp, verifyOtp }