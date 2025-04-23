const { Router } = require("express");
const smsHandler = require("../handlers/smsHandler");
const successHandler = require("../../middleware/successHandler");
const { otpGenerator } = require("../../utils/randOtp");
const transporter = require("../service/transporter");
const { generateCacheKey, setCache, getCache, delCache } = require("../../utils/cache");
const { setCookie, getCookie, clearCookie } = require("../../utils/cookies");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
const otpRoutes = Router();

const sendOtp2Email = async (email, name = "Customer") => {
  try {
    const [first_name, last_name] = name.split(' ');
    if (!email) {
      const err = new Error("Email is requried !");
      err.status = 400;
      throw err;
    }
    if (email === '' || !emailRegex.test(email)) {
      const inValidEmail = new Error("Enter Valid Email Address");
      inValidEmail.status = 400;
      throw inValidEmail;
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
            .otp{
              font-weight: 600;
              text-align: center;
              font-size: 2em;
              background-color: #EBEBE4;
              width: fit-content;
              letter-spacing: 0.3em;
              padding: 6px 8px;
              border-radius: 0.2em;
              margin: auto;
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
              <p>Dear ${first_name},</p>
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
    const emailResponse = await transporter.sendMail(mailOptions);

    const messageId = emailResponse.messageId;
    const emailKey = generateCacheKey('otp', messageId, 'send');
    setCache(emailKey, { messageId, email, otp }, 500);
    return { messageId, email, expiresIn: '5 min' };
  } catch (error) {
    throw error;
  }
}

const verifyOtp = async (otp, messageId) => {
  if (!otp) {
    const err = new Error("Enter OTP");
    throw err;
  }
  if (!messageId) {
    const err = new Error("Missing message ID in headers");
    throw err;
  }
  const verifyKey = generateCacheKey('otp', messageId, 'send');
  const verify = await getCache(verifyKey);
  const expireOtp = new Error('OTP expired');
  expireOtp.status = 403;
  if (!verify) throw expireOtp;
  if (otp === verify.otp) {
    await delCache(verifyKey);
    return { isVerified: true }
  }
  throw new Error('invalid otp');
}

otpRoutes.post('/send', async (req, res, next) => {
  try {
    const identity = 'email';
    switch (identity) {
      case 'email':
        const name = req.body.name;
        const email = req.body.email;
        const response = await sendOtp2Email(email, name);
        setCookie(res, 'otpSessionId', response.messageId, {
          maxAge: 5 * 60 * 1000  // 5 minutes
        })
        return res.status(200).json(successHandler(response, 'OTP sent successfully', 200))
      default:
        res.send({ msg: "not implemented" });
    }
  } catch (error) {
    next(error);
  }
})

otpRoutes.post('/verify', async (req, res, next) => {
  try {
    const key = "otpSessionId"
    const messageId = getCookie(req, key);
    const { otp } = req.body;
    const response = await verifyOtp(otp, messageId);
    clearCookie(res, key);
    return res.status(200).json(successHandler(response, 'OTP verified successfully', 200))
  } catch (error) {
    next(error);
  }
})

module.exports = otpRoutes;

// otp html body
// < !DOCTYPE html >
//     <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Email Verification Code</title>
//                     <style>
//                         body {
//                             font - family: 'Helvetica Neue', Arial, sans-serif;
//                         margin: 0;
//                         padding: 0;
//                         background-color: #f5f5f5;
//         }
//                         .email-container {
//                             background - color: #ffffff;
//                         margin: 40px auto;
//                         padding: 30px;
//                         border-radius: 8px;
//                         width: 600px;
//                         box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }
//                         .email-header {
//                             text - align: center;
//                         border-bottom: 1px solid #e2e2e2;
//                         padding-bottom: 20px;
//                         margin-bottom: 20px;
//         }
//                         .email-header h2 {
//                             font - size: 24px;
//                         color: #333;
//                         font-weight: bold;
//                         margin: 0;
//         }
//                         .email-body {
//                             font - size: 16px;
//                         line-height: 1.6;
//                         color: #555;
//         }
//                         .email-body p {
//                             margin: 15px 0;
//         }
//                         .otp-code {
//                             font - size: 24px;
//                         font-weight: bold;
//                         color: #1e7e34;
//                         padding: 10px;
//                         border-radius: 4px;
//                         background-color: #e8f5e9;
//                         margin: 20px 0;
//         }
//                         .highlight {
//                             font - weight: bold;
//                         color: #1e7e34;
//         }
//                         .footer {
//                             text - align: center;
//                         font-size: 12px;
//                         color: #888;
//                         margin-top: 40px;
//         }
//                         .footer a {
//                             color: #888;
//                         text-decoration: none;
//         }
//                     </style>
//                 </head>
//                 <body>

//                     <div class="email-container">
//                         <div class="email-header">
//                             <h2>Email Verification</h2>
//                         </div>

//                         <div class="email-body">
//                             <p>Dear Customer,</p>
//                             <p>Thank you for registering with us. To complete your registration and verify your email address, please use the following one-time password (OTP):</p>

//                             <div class="otp-code">
//                                 <span class="highlight">xxxx</span>
//                             </div>

//                             <p>This OTP will be valid for the next <span class="highlight">5 minutes</span>.</p>
//                             <p>If you did not initiate this verification request, please disregard this email. Your account remains secure.</p>
//                             <p>If you have any questions, feel free to reach out to our support team.</p>
//                         </div>

//                         <div class="footer">
//                             <p>&copy; 2025 Your Company Name. All rights reserved.</p>
//                             <p><a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a></p>
//                         </div>
//                     </div>

//                 </body>
// </html>
