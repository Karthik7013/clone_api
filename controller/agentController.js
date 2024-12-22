const connectToDatabase = require("../db/db");
const { GET_AGENT_ID, GET_AGENT_CUSTOMERS, GET_AGENT_POLICIES, CREATE_AGENT_CUSTOMERS } = require("../db/queries/queries.constants");
const successHandler = require("../middleware/successHandler");
// import { v4 as uuidv4 } from 'uuid';
const uuidv4 = require('uuid');
const { getCache, setCache, generateCacheKey } = require("../utils/cache");
// @desc     get agent profile
// @route    /profile
// @access   private
const getAgentProfile = async (req, res, next) => {
    const connection = await connectToDatabase();
    const agent_id = req.auth.loginId;
    try {
        const cacheResponse = await getCache(`agent:${agent_id}:profile`);
        if (cacheResponse) {
            return res.status(200).json(
                cacheResponse
            )
        }
        const response = await connection.execute(GET_AGENT_ID, [agent_id]);
        const cacheKey = generateCacheKey('agent', `${agent_id}`, 'profile');
        await setCache(cacheKey,
            successHandler(
                {
                    ...response[0][0],
                    "permissions": [
                        2000,
                        2001,
                        2002,
                        2003,
                        2004,
                        2005,
                        2006, // exam 
                        2007 // study material 
                    ],
                    role: 'agent'
                },
                'Agent found.',
                200)
        )
        return res.status(200).json(
            successHandler({
                ...response[0][0],
                "permissions": [
                    2000,
                    2001,
                    2002,
                    2003,
                    2004,
                    2005,
                    2006, // exam 
                    2007 // study material 
                ],
                role: 'agent'
            }, 'Agent found.', 200)
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

const getAgentCustomers = async (req, res, next) => {
    const connection = await connectToDatabase();
    const agent_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_AGENT_CUSTOMERS, [agent_id]);
        return res.status(200).json(
            successHandler(
                response[0],
                'Agent Customers',
                200
            )
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

const getAgentPolicies = async (req, res, next) => {
    const connection = await connectToDatabase();
    const agent_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_AGENT_POLICIES, [agent_id]);
        return res.status(200).json(
            successHandler(
                response[0],
                'Agent Policies',
                200
            )
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

const createAgentCustomer = async (req, res, next) => {
    const connection = await connectToDatabase();
    const agent_id = req.auth.loginId;
    const customer_id = uuidv4()
    const {
        firstname = null,
        lastname = null,
        phone = null,
        email = null,
        dob = null,
        gender = null,
        address = null,
        state = null,
        city = null,
        pincode = null,
        country = null,
        marital_status = null
    } = req.body;

    try {
        const response = await connection.execute(CREATE_AGENT_CUSTOMERS, [customer_id, firstname, lastname, phone, email, dob, gender, address, state, city, pincode, country, marital_status, agent_id]);
        return res.status(201).json(
            successHandler(
                null,
                'Agent Customer Created',
                201
            )
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}
module.exports = { getAgentProfile, getAgentCustomers, getAgentPolicies, createAgentCustomer }