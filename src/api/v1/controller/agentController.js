const connectToDatabase = require("../../config/db");
const { GET_AGENT_ID, GET_AGENT_CUSTOMERS, GET_AGENT_POLICIES, CREATE_AGENT_CUSTOMERS } = require("../../config/queries.constants");
const successHandler = require("../../middleware/successHandler");
// import { v4 as uuidv4 } from 'uuid';
const uuidv4 = require('uuid');
const { getCache, setCache, generateCacheKey } = require("../../utils/cache");
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

const agentStats = async (req, res, next) => {
    const connection = await connectToDatabase();
    const agent_id = req.auth.loginId;
    // count customer
    // count policies (renewal approved rejected)
    // commission gained through policies
    // count total amount for all the policies
    // 

    // Total Policies Sold
    // Total Premiums Collected
    // New Leads
    // Conversion Rate
    // Pending Policies
    // Total Revenue Generated
    // Claims Filed
    // Policy Expiry Alerts
    // const dummyJson = {
    //     "agent_stats": {
    //         "total_policies_sold": 150,
    //         "total_premiums_collected": 2500000,
    //         "new_leads": 80,
    //         "conversion_rate": 0.75,
    //         "pending_policies": 12,
    //         "total_revenue_generated": 1000000,
    //         "claims_filed": 5,
    //         "customer_satisfaction_rating": 4.5,
    //         "policy_expiry_alerts": 10,
    //         "top_policies_sold": [
    //             {
    //                 "policy_name": "Life Insurance",
    //                 "policies_sold": 50,
    //                 "premium_collected": 1000000
    //             },
    //             {
    //                 "policy_name": "Car Insurance",
    //                 "policies_sold": 40,
    //                 "premium_collected": 800000
    //             },
    //             {
    //                 "policy_name": "Health Insurance",
    //                 "policies_sold": 30,
    //                 "premium_collected": 600000
    //             },
    //             {
    //                 "policy_name": "Home Insurance",
    //                 "policies_sold": 15,
    //                 "premium_collected": 300000
    //             },
    //             {
    //                 "policy_name": "Travel Insurance",
    //                 "policies_sold": 15,
    //                 "premium_collected": 300000
    //             }
    //         ]
    //     },
    //     "visual_data": {
    //         "total_policies_graph": {
    //             "data": [10, 20, 25, 30, 35, 40, 50],
    //             "labels": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    //             "type": "bar"
    //         },
    //         "conversion_rate_graph": {
    //             "data": [0.72, 0.75, 0.78, 0.74, 0.76, 0.80, 0.75],
    //             "labels": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    //             "type": "line"
    //         },
    //         "total_revenue_graph": {
    //             "data": [100000, 200000, 250000, 300000, 350000, 400000, 500000],
    //             "labels": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    //             "type": "area"
    //         }
    //     },
    //     "alerts": {
    //         "pending_policies_alert": {
    //             "count": 12,
    //             "message": "You have 12 pending policies that need attention."
    //         },
    //         "expiry_alert": {
    //             "count": 10,
    //             "message": "You have 10 policies expiring in the next 30 days."
    //         }
    //     }
    // }


    try {
        return res.status(201).json(
            successHandler(
                {
                },
                'Agent stats',
                200
            )
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

module.exports = { getAgentProfile, getAgentCustomers, getAgentPolicies, createAgentCustomer }