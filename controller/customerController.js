const connectToDatabase = require("../db/db");
const { GET_CUSTOMER_POLICIES, GET_POLICY_PAYMENT, GET_CUSTOMER_CLAIMS, REGISTER_CLAIM, INSERT_CLAIM, CREATE_POLICY, CREATE_PAYMENT, UPDATE_PAYMENT, GET_CUSTOMER_ID } = require("../db/queries/queries.constants");
const { v4: uuidv4 } = require('uuid');
const successHandler = require('../middleware/successHandler')


// @desc     get customer stats
// @route    /stats
// @access   private
const getCustomerStats = async (req, res, next) => {
    const connection = await connectToDatabase();
    const customer_id = req.auth.loginId;
    try {
        
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
        
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}



// @desc     get customer policies
// @route    /profile
// @access   private
const getCustomerProfile = async (req, res, next) => {
    const connection = await connectToDatabase();
    const customer_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_CUSTOMER_ID, [customer_id]);
        return res.status(200).json(
            successHandler(
                {
                    ...response[0][0],
                    "permissions": [
                        1000,
                        1001,
                        1002,
                        1003, 1004, 1005
                    ],
                    role: 'customer'


                },
                "Customer found.",
                200,
            )
        )
    } catch (error) {
        next(error)
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
        const response = await connection.execute(GET_CUSTOMER_POLICIES, [customer_id]);
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
        const response = await connection.execute(GET_POLICY_PAYMENT, [customer_id]);
        return res.status(200).json(
            successHandler(response[0], "Policies Payment Status", 200)
        )
    } catch (error) {
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
        await connection.execute(INSERT_CLAIM, [claim_id, register_claim_id, new Date(), description])
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
        const response = await connection.execute(GET_CUSTOMER_CLAIMS, [customer_id]);
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

module.exports = { getCustomerPolicies, getPolicyPayments, getCustomerClaims, registerClaim, createPolicy, updatePaymentDetails, getCustomerProfile, getCustomerStats, getCustomerPolicyQueues }