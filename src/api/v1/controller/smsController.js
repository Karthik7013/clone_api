const { otpGenerator } = require("../../utils/randOtp");
const transporter = require('../service/transporter');
const { generateCacheKey, setCache, getCache, delCache } = require("../../utils/cache");
const successHandler = require("../../middleware/successHandler");

const sendOtp = async (req, res, next) => {
  try {
    const phno = req.body.phno;
    const email = req.body.email;
    const name = req.body.name || 'Customer'
    if (!email) {
      const err = new Error("Email is requried !");
      err.status = 400;
      next(err);
    }
    const otp = otpGenerator();
    // Email options
    const mailOptions = {
      from: process.env.EMAIL, // Sender address
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
          <p>If you have any issues or questions, feel free to contact our support at <a href="mailto:[Support Email]">${process.env.EMAIL}</a>.</p>
          <p>&copy; 2024 Namelix 360° Total Insurance. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
            `};

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        next(error);
      } else {
        const smsKey = generateCacheKey('sms', email, 'send');
        setCache(smsKey, otp, 50);
        console.log('Email sent successfully:', info.response);
        return res.status(200).json(successHandler({}, "OTP sent successfully.", 200))
      }
    });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
}

//     async (req, res, next) => {
//     try {
//         const otpRes = await fetch('https://www.tataaig.com/lambda/prod-genericService/sendOTP', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(req.body)
//         })

//         if (!otpRes.ok) {
//             const errorData = await otpRes.json();
//             return res.status(otpRes.status).json({
//                 message: 'Failed to send OTP',
//                 error: errorData,
//             });
//         }

//         const data = await otpRes.json();
//         res.status(200).json(successHandler(data, 'OTP sent successfully', 200));
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         res.status(500).json({
//             message: 'An error occurred while sending OTP',
//             error: error.message,
//         });
//     }
// }





const verifyOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    const verifyKey = generateCacheKey('sms', email, 'send')
    const verify = await getCache(verifyKey);

    if (otp === verify) {
      await delCache(verifyKey);
      return res.status(200).json(successHandler({}, "Verified successfully", 200))
    }
    throw new Error('Failed to verify')
  } catch (error) {
    error.status = 500;
    next(error)
  }
}

// resetpassword steps

// click reset  password
// sent otp to register mail
// take new password
// confirm password
// verify the otp
// if true update password


// or -----------

// generate a key 


// resetpassword/key => redirect
// send this key to email


// 



//     async (req, res, next) => {
//     try {
//         const verifyRes = await fetch('https://www.tataaig.com/lambda/prod-genericService/verifyOTP', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(req.body)
//         })
//         const data = await verifyRes.json();
//         res.status(200).json(successHandler(data, 'OTP verified successfully', 200));
//     } catch (error) {
//         console.error('Error Verifying OTP:', error);
//         res.status(500).json({
//             message: 'An error occurred while verifying OTP',
//             error: error.message,
//         });
//     }
// }

module.exports = { sendOtp, verifyOtp }