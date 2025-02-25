const connectToDatabase = require("../../config/db");
const valkey = require("../../config/redisClient");
const { v4: uuidv4 } = require('uuid');
const { GET_CUSTOMER_POLICIES, GET_POLICY_PAYMENT, GET_CUSTOMER_CLAIMS, REGISTER_CLAIM, INSERT_CLAIM, CREATE_POLICY, CREATE_PAYMENT, UPDATE_PAYMENT, GET_CUSTOMER_ID, GET_CUSTOMER_ACTIVE_POLICIES, GET_CUSTOMER_RENEWAL_POLICIES, GET_CUSTOMER_REGISTER_POLICIES, UPDATE_CUSTOMER_BY_ID, CUSTOMER_APPLICATION_QUEUE, DELETE_CUSTOMER_BY_ID } = require("../../config/queries.constants");
const successHandler = require('../../middleware/successHandler');
const transporter = require('../service/transporter');
const { generateCacheKey, setCache, getCache } = require('../../utils/cache')


// @desc     get customer stats
// @route    /stats
// @access   private
const getCustomerStats = async (req, res, next) => {
    const connection = await connectToDatabase();
    const customer_id = req.auth.loginId;
    try {
        // check cache
        const cacheResponse = await getCache(`customer:${customer_id}:stats`);
        if (cacheResponse) {
            return res.status(200).json(cacheResponse)
        }
        const active_policy = await connection.execute(GET_CUSTOMER_ACTIVE_POLICIES, [customer_id]);
        const expire_policy = await connection.execute(GET_CUSTOMER_RENEWAL_POLICIES, [customer_id]);
        const claim_policy = await connection.execute(GET_CUSTOMER_CLAIMS, [customer_id]);
        const register_policy = await connection.execute(GET_CUSTOMER_REGISTER_POLICIES, [customer_id]);
        // cache responses
        const cacheKey = generateCacheKey('customer', `${customer_id}`, 'stats');
        await setCache(cacheKey, successHandler({
            "activePolicies": {
                "count": active_policy[0].length,
                "percentage": 83.33,
            },

            "renewalPolicies": {
                "count": expire_policy[0].length,
                "percentage": 20.83,
            },
            "claimPolicies": {
                "count": claim_policy[0].length,
                "percentage": 33.33,
                "pending": "",
                "reject": "",
                "approved": ""
            },
            "registeredClaimPolicies": {
                "count": register_policy[0].length,
                "percentage": 37.5,

            }
        }, 'Customer Stats', 200))

        return res.status(200).json(
            successHandler({
                "activePolicies": {
                    "count": active_policy[0].length,
                    "percentage": 83.33,
                },

                "renewalPolicies": {
                    "count": expire_policy[0].length,
                    "percentage": 20.83,
                },
                "claimPolicies": {
                    "count": claim_policy[0].length,
                    "percentage": 33.33,
                    "pending": "",
                    "reject": "",
                    "approved": ""
                },
                "registeredClaimPolicies": {
                    "count": register_policy[0].length,
                    "percentage": 37.5,

                }
            }, 'Customer Stats', 200)
        )


    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

// @desc     get customer policies queues
// @route    /stats
// @access   private
const getCustomerPolicyQueues = async (req, res, next) => {
    const connection = await connectToDatabase();
    const customer_id = req.auth.loginId;
    try {
        // check cache
        const cacheResponse = await getCache(`customer:${customer_id}:policyQueues`);
        if (cacheResponse) {
            return res.status(200).json(cacheResponse)
        }
        const response = await connection.execute(CUSTOMER_APPLICATION_QUEUE, [customer_id]);

        // cache the data
        const cacheKey = generateCacheKey('customer', `${customer_id}`, 'policyQueues');
        await setCache(cacheKey, successHandler(
            response[0],
            'customer applications', 200
        ))

        return res.status(200).json(
            successHandler(
                response[0],
                'customer applications', 200
            )
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}



// @desc     get customer policies
// @route    /profile
// @access   private
const getCustomerProfile = async (customer_id) => {
    if (!customer_id) throw new Error("customer_id invalid/not_found");
    const connection = await connectToDatabase();
    try {
        // check cache
        const cacheResponse = await getCache(`customer:${customer_id}:profile`);
        if (cacheResponse) return cacheResponse
        const response = await connection.execute(GET_CUSTOMER_ID, [customer_id]);
        if (!response[0][0]) throw new Error('Customer Not Found !')
        // cache the data
        const cacheKey = generateCacheKey('customer', `${customer_id}`, 'profile');
        await setCache(cacheKey, response[0][0]);
        return response[0][0]
    } catch (error) {
        throw error
    } finally {
        await connection.end();
    }
}

// for employee purpose
const getCustomerProfiles = async (filter = {
    limit: 10, //default limit
    page: 1    //default page
}) => {
    const { limit, page } = filter;
    // add extra filter in body to get only assigned customers
    // dynamic query
    // SELECT * FROM CUSTOMER WHERE employee_id = ? limit=limit offset=page-1
    const connection = await connectToDatabase();
    try {
        // check cache
        const cacheResponse = await getCache(`customer:${customer_id}:profile`);
        if (cacheResponse) return cacheResponse

        const response = await connection.execute(GET_CUSTOMER_ID, [customer_id]);
        // cache the data
        const cacheKey = generateCacheKey('customer', `${customer_id}`, 'profile');
        await setCache(cacheKey, response[0][0]);
        return response[0][0]
    } catch (error) {
        throw error
    } finally {
        await connection.end();
    }
}

// @desc     get customer policies
// @route    /profile
// @access   private
const updateCustomerProfile = async (customer_id, updateDetails) => {
    console.log(updateDetails, "updatedCustomerDetails");
    const connection = await connectToDatabase();
    const {
        email,
        dob,
        gender,
        address,
        state,
        city,
        pincode,
        country,
        marital_status,
        bio
    } = updateDetails;
    try {
        const response = await connection.execute(UPDATE_CUSTOMER_BY_ID, [email, dob, gender, address, state, city, pincode, country, marital_status, bio, customer_id]);
        return { data: "update successfully !" }
    } catch (error) {
        throw error;
    } finally {
        await connection.end();
    }
}

const deleteCustomerProfile = async (customer_id) => {
    const connection = await connectToDatabase();
    try {
        await connection.execute(DELETE_CUSTOMER_BY_ID, [customer_id]);
    } catch (error) {
        throw error;
    } finally {
        await connection.end();
    }
}

// @desc     get customer policies
// @route    /policies
// @access   private
const getCustomerPolicies = async (req, res, next) => {
    const { limit = 10, page = 1 } = req.query;
    const limitValue = parseInt(limit, 10);
    const pageValue = parseInt(page, 10);
    const offset = (pageValue - 1) * limitValue
    const customer_id = req.auth.loginId;
    const connection = await connectToDatabase();
    try {
        // check cache
        const cacheResponse = await getCache(`customer:${customer_id}:policies`);
        if (cacheResponse) {
            return res.status(200).json(cacheResponse)
        }
        const response = await connection.execute(GET_CUSTOMER_POLICIES, [customer_id]);
        // cache the data
        const cacheKey = generateCacheKey('customer', `${customer_id}`, 'policies');
        await setCache(cacheKey, successHandler(response[0], "Customer Policies", 200))

        return res.status(200).json(
            successHandler(response[0], "Customer Policies", 200)
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end()
    }
}


// @desc     get customer policy payments
// @route    /payments
// @access   private
const getPolicyPayments = async (req, res, next) => {
    const connection = await connectToDatabase();
    const customer_id = req.auth.loginId;
    try {
        // check cache
        const cacheResponse = await getCache(`customer:${customer_id}:payments`);
        if (cacheResponse) {
            return res.status(200).json(cacheResponse)
        }

        const response = await connection.execute(GET_POLICY_PAYMENT, [customer_id]);
        // cache the data
        const cacheKey = generateCacheKey('customer', `${customer_id}`, 'payments');
        await setCache(cacheKey, successHandler(response[0], "Policies Payment Status", 200))

        return res.status(200).json(
            successHandler(response[0], "Policies Payment Status", 200)
        )
    } catch (error) {
        console.log(error)
        next(error)
    } finally {
        await connection.end()
    }
}

// @desc     register customer claims
// @route    /register-claims
// @access   private
const registerClaim = async (req, res, next) => {
    const customer_id = req.auth.loginId;
    const {
        first_name,
        last_name,
        dob,
        gender,
        phone,
        email,
        address,
        city,
        state,
        pincode,

        policy_number,
        policy_type,
        policy_issue_date,

        claim_nature,
        incident_date,
        support_docs,
        description,
        additional_description
    } = req.body;
    const connection = await connectToDatabase();
    try {
        const customer_policies = await connection.execute(GET_CUSTOMER_POLICIES, [customer_id]);
        const foundPolicy = customer_policies[0].find(policy => policy.policy_number === policy_number);
        if (!foundPolicy) {
            const err = new Error("The specified policy could not be found. Please ensure that the policy ID is correct and try again to register for the claim.");
            err.status = 404;
            return next(err);
        }
        const register_claim_id = uuidv4().split('-')[0];
        await connection.execute(REGISTER_CLAIM, [register_claim_id, first_name, last_name, dob, gender, phone, email, address, city, state, pincode, policy_number, policy_type, policy_issue_date, claim_nature, incident_date, support_docs, description, additional_description]);



        const claim_id = uuidv4().split('-')[0]
        await connection.execute(INSERT_CLAIM, [claim_id, register_claim_id, new Date(), description]);



        // Email options
        const mailOptions = {
            from: process.env.EMAIL, // Sender address
            to: `${email}`, // List of recipients
            subject: 'Claim Process Initiated',
            html: `
          <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Claim Policy Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      padding-bottom: 20px;
    }
    .email-header h2 {
      color: #4CAF50;
    }
    .email-content {
      padding: 20px;
      background-color: #f4f4f4;
      border-radius: 8px;
    }
    .email-footer {
      padding-top: 20px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
    .btn:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <div class="email-header">
      <h2>Claim Policy Applied</h2>
      <p>Dear ${first_name},</p>
    </div>

    <div class="email-content">
      <p>We would like to inform you that a claim policy has been successfully applied to your account. Please review the details below:</p>

      <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Claim Policy ID:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${policy_number}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Account Holder Name:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${first_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Claim Type:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${claim_nature}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Claim Amount:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">-</td>
        </tr>
      </table>

      <p>If you have any questions or need further assistance, please feel free to contact our support team at ${process.env.EMAIL} or call 7013140693.</p>

      <p>We appreciate your trust in us and will keep you updated on the progress of your claim.</p>

      <p>Best regards,<br>
      Namelix 360 Total Insurance Support Team</p>

      <p style="text-align: center;">
        <a href="#" class="btn">Track Your Claim Status</a>
      </p>
    </div>

    <div class="email-footer">
      <p>&copy; 2024 Namelix 360 Total Insurance. All Rights Reserved.</p>
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




        return res.status(200).json(
            successHandler({ policy_number, description: "Your claim has been successfully registered." }, "Your claim has been successfully registered.", 200))
    } catch (error) {

        next(error)
    } finally {
        await connection.end()
    }
}

// @desc     get customer claims
// @route    /claims
// @access   private
const getCustomerClaims = async (req, res, next) => {
    const customer_id = req.auth.loginId;
    const connection = await connectToDatabase();
    try {
        // check cache
        const cacheResponse = await getCache(`customer:${customer_id}:claims`);
        if (cacheResponse) {
            return res.status(200).json(cacheResponse)
        }

        const response = await connection.execute(GET_CUSTOMER_CLAIMS, [customer_id]);
        // cache the data
        const cacheKey = generateCacheKey('customer', `${customer_id}`, 'claims');
        await setCache(cacheKey, successHandler(
            response[0],
            "Customer Claims",
            200
        ))

        return res.status(200).json(
            successHandler(
                response[0],
                "Customer Claims",
                200
            )
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end()
    }
}

// @desc     create customer policy
// @route    /register-claims
// @access   private
const createPolicy = async (req, res, next) => {
    const customerId = req.auth.loginId;
    const connection = await connectToDatabase();
    const {
        application_id,
        policy_number,
        policy_type,
        insured_name,
        insurer_company,
        agent_id,
        employee_id,
        start_date,
        end_date,
        premium_amount,
        coverage_amount,
        status,
        mode
    } = req.body;
    try {
        const response = await connection.execute(CREATE_POLICY, [application_id,
            policy_number,
            policy_type,
            insured_name,
            insurer_company,
            customerId,
            agent_id,
            employee_id,
            start_date,
            end_date,
            premium_amount,
            coverage_amount,
            status,
            mode]);
        return res.status(200).json(
            {
                "success": true,
                "message": "Policy succesfull Registered",
                "status": 200,
                "data": response[0],
                "timestamp": new Date()
            }
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end()
    }
}

const updatePaymentDetails = async (req, res, next) => {
    const connection = await connectToDatabase();
    const { status, mode, currency, payment_id } = req.body;
    try {
        const response = await connection.execute(UPDATE_PAYMENT, [new Date(), status, mode, currency, payment_id]);
        return res.status(200).json(
            {
                "success": true,
                "message": "Payment Details Updated",
                "status": 200,
                "data": response[0],
                "timestamp": new Date()
            }
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end()
    }
}

module.exports = { getCustomerPolicies, getPolicyPayments, getCustomerClaims, registerClaim, createPolicy, updatePaymentDetails, deleteCustomerProfile, getCustomerProfile, getCustomerProfiles, getCustomerStats, getCustomerPolicyQueues, updateCustomerProfile }