const { sendOtp, verifyOtp } = require("../controller/smsController");

const smsHandler = async (event) => {
    const { phone, email, name, method, otp } = event.body;
    if (!email) {
        const err = new Error("Email is requried !");
        err.status = 400;
        throw err
    }
    switch (method) {
        case 'SEND':
            await sendOtp({ phone, email, name });
            break;
        case 'VERIFY':
            await verifyOtp({ otp, email });
            break;
        default:
            throw new Error('Invalid Method');
    }

}
module.exports = { smsHandler };