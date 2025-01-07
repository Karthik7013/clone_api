

// @desc     get customer policies
// @route    /profile

const connectToDatabase = require("../db/db");
const { GET_EMPLOYEE_ID, GET_ALL_CUSTOMERS, GET_ALL_AGENTS, GET_ALL_EMPLOYEES, GET_ALL_CLAIMS, CREATE_NEW_EMPLOYEE, CREATE_EMP_ROLE } = require("../db/queries/queries.constants");
const successHandler = require("../middleware/successHandler");
const { generateCacheKey, getCache, setCache } = require("../utils/cache");
const { v4: uuid } = require('uuid');
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
        console.log(response[0])

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
    const employee_id = req.auth.loginId;
    try {
        const cacheResponse = await getCache(`employee:${employee_id}:allCustomerProfiles`);
        if (cacheResponse) {
            return res.status(200).json(
                cacheResponse
            )
        }
        const response = await connection.execute(GET_ALL_CUSTOMERS);
        // cache the data
        const cacheKey = generateCacheKey('employee', `${employee_id}`, 'allCustomerProfiles');
        await setCache(cacheKey,
            successHandler(
                response[0],
                "Customer List",
                200,
            )
        )
        return res.status(200).json(
            successHandler(
                response[0],
                "Customer List",
                200,
            ))
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
        const cacheResponse = await getCache(`employee:${employee_id}:allEmployeesProfiles`);
        if (cacheResponse) {
            return res.status(200).json(
                cacheResponse
            )
        }
        const response = await connection.execute(GET_ALL_EMPLOYEES);
        // cache the data
        const cacheKey = generateCacheKey('employee', `${employee_id}`, 'allEmployeesProfiles');
        await setCache(cacheKey,
            successHandler(
                response[0],
                "Employee List",
                200,
            )
        )
        return res.status(200).json(
            successHandler(
                response[0],
                "Employee List",
                200,
            )
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
        const cacheResponse = await getCache(`employee:${employee_id}:allAgentsProfiles`);
        if (cacheResponse) {
            return res.status(200).json(
                cacheResponse
            )
        }
        const response = await connection.execute(GET_ALL_AGENTS);
        // cache the data
        const cacheKey = generateCacheKey('employee', `${employee_id}`, 'allAgentsProfiles');
        await setCache(cacheKey,
            successHandler(
                response[0],
                "Agent List",
                200,
            )
        )
        return res.status(200).json(
            successHandler(
                response[0],
                "Agent List",
                200,
            )
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


const createEmployee = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId; // check permission for this id to create a customer
    const { body } = req;
    const new_employee_id = uuid().split('-')[0];
    const values = [
        new_employee_id,
        body?.firstName,
        body?.lastName,
        body?.phone,
        body?.email,
        body?.dob,
        body?.gender,
        body?.address,
        body?.state,
        body?.city,
        body?.pincode,
        body?.country,
        body?.salary,
        body?.department,
        body?.role,
        body?.joinDate,
        body?.status
    ]
    try {
        const res1 = await connection.execute(CREATE_NEW_EMPLOYEE, values);
        const new_role_id = uuid().split('-')[0]
        const res2 = await connection.execute(CREATE_EMP_ROLE, [new_role_id, new_employee_id, body?.reporting]);
        return res.status(200).json(
            successHandler({
            }, 'Employee Created Successfully !', 201)
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

module.exports = { getEmployeeProfile, getAgentProfiles, getEmployeeProfiles, getCustomerProfiles, getClaims, createEmployee }