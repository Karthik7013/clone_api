const connectToDatabase = require("../db/db");
const { GET_EMPLOYEE_ID, GET_CUSTOMER_POLICIES, GET_POLICY_PAYMENT, GET_CUSTOMER_CLAIMS, REGISTER_CLAIM, INSERT_CLAIM } = require("../db/queries/queries.constants");
const { v4: uuidv4 } = require('uuid');

// @desc     create new Agent
// @route    /signup/agent
// @access   public
const getCustomerPolicies = async (req, res, next) => {
    const { limit = 10, page = 1 } = req.query;
    const limitValue = parseInt(limit, 10);
    const pageValue = parseInt(page, 10);
    const offset = (pageValue - 1) * limitValue
    const customer_id = req.auth.loginId;
    const connection = await connectToDatabase();
    // const extendQuery = GET_CUSTOMER_POLICIES + ` AND LIMIT = ? AND OFFSET = ?`;
    try {
        const response = await connection.execute(GET_CUSTOMER_POLICIES, [customer_id]);
        return res.status(200).json(
            {
                "success": true,
                "message": "Customer Policies",
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



const getPolicyPayments = async (req, res, next) => {
    const connection = await connectToDatabase();
    const customer_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_POLICY_PAYMENT, [customer_id]);
        return res.status(200).json(
            {
                "success": true,
                "message": "Policies Payment Status",
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

const registerClaim = async (req, res, next) => {
    const customer_id = req.auth.loginId;
    const { policy_id, description } = req.body;
    const connection = await connectToDatabase();
    try {
        // GENERATE A REGESTERED_CLAIM_ID => rclm0017
        const register_claim_id = uuidv4().split('-')[0];
        // registering own policy_id not other policy_id
        const customer_policies = await connection.execute(GET_CUSTOMER_POLICIES, [customer_id]);
        const foundPolicy = customer_policies[0].find(policy => policy.policy_id === policy_id);
        if (!foundPolicy) {
            const err = new Error("The specified policy could not be found. Please ensure that the policy ID is correct and try again to register for the claim.");
            err.status = 404;
            return next(err);
        }
        await connection.execute(REGISTER_CLAIM, [register_claim_id, policy_id, description]);
        const claim_id = uuidv4().split('-')[0]
        await connection.execute(INSERT_CLAIM, [claim_id, register_claim_id])
        return res.status(200).json({
            "success": true,
            "message": "Your claim has been successfully registered.",
            "status": 200,
            "data": { policy_id, description },
            "timestamp": new Date()
        })
    } catch (error) {
        next(error)
    } finally {
        await connection.end()
    }
}

const getCustomerClaims = async (req, res, next) => {
    const customer_id = req.auth.loginId;
    const connection = await connectToDatabase();
    try {
        const response = await connection.execute(GET_CUSTOMER_CLAIMS, [customer_id]);
        return res.status(200).json(
            {
                "success": true,
                "message": "Customer Claims",
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

module.exports = { getCustomerPolicies, getPolicyPayments, getCustomerClaims, registerClaim }