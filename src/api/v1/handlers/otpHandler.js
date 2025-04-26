const { otpGenerator } = require("../../utils/randOtp");
const transporter = require("../service/transporter");
const { generateCacheKey, setCache, getCache, delCache } = require("../../utils/cache");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;

const sendOtp2Email = async (email, name = "Customer", data = null) => {
  try {
    const [first_name, last_name] = name.split(' ');
    if (!email) {
      const err = new Error("Email is required.");
      err.status = 400;
      throw err;
    }
    if (email === '' || !emailRegex.test(email)) {
      const inValidEmail = new Error("Enter Valid Email Address.");
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
    setCache(emailKey, { messageId, email, otp, data }, 500);
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
    const { data = null } = verify;
    await delCache(verifyKey);
    return data;
  }
}



module.exports = {
  sendOtp2Email, verifyOtp
}