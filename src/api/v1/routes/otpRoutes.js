const { Router } = require("express");
const successHandler = require("../../middleware/successHandler");
const { setCookie, getCookie, clearCookie } = require("../../utils/cookies");
const { sendOtp2Email, verifyOtp } = require("../handlers/otpHandler");
const rateLimiter = require("../../middleware/rateLimiter");
const otpRoutes = Router();

// 1 request per 2 min
otpRoutes.post('/send', rateLimiter(2 * 60 * 1000, 1), async (req, res, next) => {
  try {
    const { identity } = req.body
    if (!identity) {
      const err = new Error('Identity is required !')
      next(err)
    }
    switch (identity) {
      case 'email':
        const email = req.body.email;
        const name = req.body.name;
        const response = await sendOtp2Email(email, name);
        setCookie(res, 'otpSessionId', response.messageId, {
          maxAge: 2 * 60 * 1000  // 2 minutes
        })
        return res.status(200).json(successHandler(response, 'OTP sent successfully', 200))
      default:
        const notImplemented = new Error("Not Implemented")
        next(notImplemented);
    }
  } catch (error) {
    next(error);
  }
})

// 10 request per min
otpRoutes.post('/verify', rateLimiter(1 * 60 * 1000, 10), async (req, res, next) => {
  const { redirect } = req.query;
  try {
    const key = "otpSessionId";
    const messageId = getCookie(req, key);
    const { otp } = req.body;
    const response = await verifyOtp(otp, messageId);
    clearCookie(res, key);
    if (redirect) {
      return res.redirect(redirect);
    }
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
