

// @desc     get customer policies
// @route    /profile

const connectToDatabase = require("../db/db");
const { GET_EMPLOYEE_ID, GET_ALL_CUSTOMERS, GET_ALL_AGENTS, GET_ALL_EMPLOYEES, GET_ALL_CLAIMS } = require("../db/queries/queries.constants");
const successHandler = require("../middleware/successHandler");
const { generateCacheKey, getCache, setCache } = require("../utils/cache");

// @access   private
const getEmployeeProfile = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId;
    try {
        const cacheResponse = await getCache(`employee:${employee_id}:profile`);
        if (cacheResponse) {
            return res.status(200).json(
                cacheResponse
            )
        }
        const response = await connection.execute(GET_EMPLOYEE_ID, [employee_id]);

        // cache the data
        const cacheKey = generateCacheKey('employee', `${employee_id}`, 'profile');
        await setCache(cacheKey,
            successHandler(
                {
                    ...response[0][0],
                    role: 'employee'
                },
                "Employee found.",
                200,
            )
        )

        return res.status(200).json(
            successHandler(
                {
                    ...response[0][0],
                    role: 'employee'
                },
                "Employee found.",
                200,
            )
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

const getCustomerProfiles = async (req, res, next) => {
    const connection = await connectToDatabase();
    // const employee_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_ALL_CUSTOMERS);
        return res.status(200).json(
            {
                "success": true,
                "message": "Customer List.",
                "status": 200,
                "data": response[0],
                "timestamp": new Date()
            }
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

const getEmployeeProfiles = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_ALL_EMPLOYEES);
        return res.status(200).json(
            {
                "success": true,
                "message": "Employees List.",
                "status": 200,
                "data": response[0],
                "timestamp": new Date()
            }
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

const getAgentProfiles = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_ALL_AGENTS);
        return res.status(200).json(
            {
                "success": true,
                "message": "Agents List",
                "status": 200,
                "data": response[0],
                "timestamp": new Date()
            }
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}
const getClaims = async (req, res, next) => {
    const connection = await connectToDatabase();
    // const employee_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_ALL_CLAIMS);
        return res.status(200).json(
            {
                "success": true,
                "message": "Claims List",
                "status": 200,
                "data": response[0],
                "timestamp": new Date()
            }
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

module.exports = { getEmployeeProfile, getAgentProfiles, getEmployeeProfiles, getCustomerProfiles, getClaims }