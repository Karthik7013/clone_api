const { Router, text } = require("express");
const { otpGenerator } = require("../../utils/randOtp");
const transporter = require('../service/transporter');
const { generateCacheKey, setCache } = require("../../utils/cache");

const smsRoutes = Router();

smsRoutes.post('/sendOtp', async (req, res, next) => {
    try {
        const phno = req.body.phno;
        const email = req.body.email;
        const name = req.body.name || 'Customer'
        if (!phno) {
            const err = new Error("Phone number is requried !");
            err.status = 400;
            next(err);
        }
        const otp = otpGenerator();
        // Email options
        const mailOptions = {
            from: 'karthiktumala143@gmail.com', // Sender address
            to: `${email}`, // List of recipients
            subject: 'Account Verification - OTP',
            html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login Notification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #23a8fa;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          margin-top: 20px;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #888888;
        }
        .important {
          color: #D8000C;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>OTP Verification</h1>
        </div>

        <!-- Content -->
        <div class="content">
          <p>Dear ${name},</p>
            <p>Below is your One-Time Password (OTP) for the account verification process:</p>
            
            <p class="otp">${otp}</p>
            
            <p><strong>Please note:</strong> This OTP is valid for the next 5 minutes only. Once the time expires, a new OTP will be required.</p>
            
            <p>If you did not request this OTP, please disregard this email. If you have any questions or need assistance, feel free to contact our support team.</p>
          <p>Thank you for using <strong>Namelix 360° Total Insurance</strong>.</p>
          <p>Best regards, <br>The <strong>Namelix 360° Total Insurance</strong> Team</p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>If you have any issues or questions, feel free to contact our support at <a href="mailto:[Support Email]">karthiktumala143@gmail.com</a>.</p>
          <p>&copy; 2024 Namelix 360° Total Insurance. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
            `};

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });

        // add email to cache db
        const smsKey = generateCacheKey('sms', email, 'send');
        setCache(smsKey, otp, 5);
        res.status(200).json({ success: true, message: "otp send successfully" })
    } catch (error) {
        error.status = 500;
        return next(error);
    }
})

smsRoutes.post('/verifyOtp', async (req, res, next) => {
    try {
        const { otp } = req.body;
        console.log(otp)

        res.status(200).json({ message: 'otp verified successfully' })
    } catch (error) {
        error.status = 500;
        next(error)
    }
})
smsRoutes.post('/resendOtp', async (req, res, next) => {
    try {
        const { otp } = req.body;
        console.log(otp)

        res.status(200).json({ message: 'otp send successfully' })
    } catch (error) {
        error.status = 500;
        next(error)
    }
})



module.exports = smsRoutes;