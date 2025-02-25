const { verfiyCustomer } = require("../controller/authController");

const customerAuthHandler = async (event) => {
    const user_agent = event.headers['user-agent'];
    const ipAddress = event.headers['x-forwarded-for'] || event.connection.remoteAddress;
    const { phone } = event.body;
    if (!phone) throw new Error("Customer Phone Number is Required !");
    switch (event.method) {
        case 'GET':
        case 'POST':
            const verifyResponse = await verfiyCustomer(phone); // access/refresh tokens
            // store tokens in db
            // send logged in success
            return verifyResponse;
        case 'PUT':
        case 'DELETE':
        default:
            break;
    }
}

module.exports = { customerAuthHandler }


// send login success email
// Email options
//     const mailOptions = {
//         from: 'karthiktumala143@gmail.com', // Sender address
//         to: `${results[0].email}`, // List of recipients
//         subject: 'Namelix 360° Total Insurance',
//         html: `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Login Notification</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f4f4f9;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       max-width: 600px;
//       margin: 0 auto;
//       background-color: #ffffff;
//       padding: 20px;
//       border-radius: 8px;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     }
//     .header {
//       background-color: #23a8fa;
//       color: white;
//       padding: 10px;
//       text-align: center;
//       border-radius: 8px 8px 0 0;
//     }
//     .content {
//       margin-top: 20px;
//       padding: 20px;
//       background-color: #f9f9f9;
//       border-radius: 8px;
//       border: 1px solid #e0e0e0;
//     }
//     .footer {
//       margin-top: 30px;
//       text-align: center;
//       font-size: 14px;
//       color: #888888;
//     }
//     .important {
//       color: #D8000C;
//       font-weight: bold;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <!-- Header -->
//     <div class="header">
//       <h1>Login Notification</h1>
//     </div>

//     <!-- Content -->
//     <div class="content">
//       <h2>Dear ${results[0].firstname}</h2>
//       <p>We wanted to let you know that a successful login was made to your account on <strong>Namelix 360° Total Insurance</strong> at <strong>${new Date()}</strong>.</p>

//       <h3>Device Details:</h3>
//       <ul>
//         <li><strong>IP Address:</strong> ${ipAddress}</li>
//         <li><strong>Device:</strong> ${user_agent}</li>
//       </ul>

//       <p>If you did not initiate this login or suspect any suspicious activity, please immediately change your password and contact our support team at <a href="mailto:[Support Email]">karthiktumala143@gmail.com</a> for assistance.</p>

//       <p>Thank you for using <strong>Namelix 360° Total Insurance</strong>.</p>
//       <p>Best regards, <br>The <strong>Namelix 360° Total Insurance</strong> Team</p>
//     </div>

//     <!-- Footer -->
//     <div class="footer">
//       <p>If you have any issues or questions, feel free to contact our support at <a href="mailto:[Support Email]">karthiktumala143@gmail.com</a>.</p>
//       <p>&copy; 2024 Namelix 360° Total Insurance. All rights reserved.</p>
//     </div>
//   </div>
// </body>
// </html>
// `};

// Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log('Error sending email:', error);
//     } else {
//         console.log('Email sent successfully:', info.response);
//     }
// });


// store tokens in db;
// await connection.execute(INSERT_REFRESH_TOKEN, [customer_id, null, null, refreshToken, new Date(), user_agent, ipAddress])