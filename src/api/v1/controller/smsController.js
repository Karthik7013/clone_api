const { otpGenerator } = require("../../utils/randOtp");
const transporter = require('../service/transporter');
const { generateCacheKey, setCache, getCache, delCache } = require("../../utils/cache");
const successHandler = require("../../middleware/successHandler");
const connectToDatabase = require("../../config/db");

const sendOtp = async (req, res, next) => {
  try {
    const phno = req.body.phno;
    const email = req.body.email;
    const name = req.body.name || 'Customer';
    const [first_name, last_name] = name.split(' ');
    const referBy = req.body.referBy || null
    const refered_by_agent = req.body.refered_by_agent || null // IF AGENT LOGIN PASS AGENT ID
    const refered_by_employee = req.body.refered_by_employee || null // IF EMPLOYEE LOGIN PASS EMP ID

    if (!email && !phno) {
      const err = new Error("Email/phone is requried !");
      err.status = 400;
      next(err);
    }
    const otp = otpGenerator();
    console.log(otp, 'top')
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
        setCache(smsKey, { otp, email, phno, first_name, last_name, referBy, refered_by_agent, refered_by_employee }, 50);
        console.log('Email sent successfully:', info.response);
        return res.status(200).json(successHandler({}, "OTP sent successfully.", 200))
      }
    });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
}



const verifyOtp = async (req, res, next) => {
  const connection = await connectToDatabase();
  try {
    const { otp, email } = req.body;
    const verifyKey = generateCacheKey('sms', email, 'send')
    const verify = await getCache(verifyKey);
    if (!verify) throw new Error('otp expired/invalid')
    if (otp === verify.otp) {

      // implement in another controller 
      // INSERT INTO customers (firstname,lastname,phone,email,refered_by_agent,refered_by_employee) VALUES('Bhaskar','Rao',null,'bhaskarbunny1371@gmail.com', null,'E001')
      const customerData = {
        first_name: verify.first_name,
        last_name: verify.last_name,
        phone: verify.phno || null,
        email: verify.email,
        referBy: verify.referBy,
        refered_by_agent: verify.referBy === 'AGENT' ? verify.refered_by_agent : null,
        refered_by_employee: verify.referBy === 'EMPLOYEE' ? verify.refered_by_employee : null
      }
      console.log(customerData);
      const values = [customerData.first_name, customerData.last_name, customerData.phone, customerData.email, customerData.refered_by_agent, customerData.refered_by_employee]
      console.log(values)
      await connection.execute('INSERT INTO customers (firstname,lastname,phone,email,refered_by_agent,refered_by_employee) VALUES(?,?,?,?,?,?)', values);
      console.log(customerData, 'user created with this details');

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