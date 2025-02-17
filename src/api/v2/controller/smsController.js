const successHandler = require('../../middleware/successHandler')
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





const verifyOtp = async (req, res, next) => {
    try {
        const verifyRes = await fetch('https://www.tataaig.com/lambda/prod-genericService/verifyOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        })
        const data = await verifyRes.json();
        res.status(200).json(successHandler(data, 'OTP verified successfully', 200));
    } catch (error) {
        console.error('Error Verifying OTP:', error);
        res.status(500).json({
            message: 'An error occurred while verifying OTP',
            error: error.message,
        });
    }
}

module.exports = { sendOtp, verifyOtp }