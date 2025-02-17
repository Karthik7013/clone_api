const nodemailer = require('nodemailer');
// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
});
module.exports = transporter;