

// @desc     get customer policies
// @route    /profile

const { connectToDatabase } = require("../../config/db");
const { GET_EMPLOYEE_ID, GET_ALL_CUSTOMERS, GET_ALL_AGENTS, GET_ALL_EMPLOYEES, GET_ALL_CLAIMS, CREATE_NEW_EMPLOYEE, CREATE_EMP_ROLE, CREATE_ROLE, CREATE_PERMISSION, GET_ROLES, GET_PERMISSIONS, ADD_PERMISSION, GET_PERMISSION, DELETE_PERMISSION, GET_EMPLOYEE_PERMISSIONS } = require("../../config/queries.constants");
const successHandler = require("../../middleware/successHandler");
const { generateCacheKey, getCache, setCache } = require("../../utils/cache");
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
        console.log(response[0], 'employee')

        // cache the data
        const cacheKey = generateCacheKey('employee', `${employee_id}`, 'profile');
        await setCache(cacheKey,
            successHandler(
                {
                    ...response[0][0],
                    role: 'employee',
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
    const employee_id = req.auth.loginId; // check permission to create a customer
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
        body?.joinDate,
        body?.status
    ]
    try {
        const res1 = await connection.execute(CREATE_NEW_EMPLOYEE, values);
        const res2 = await connection.execute(CREATE_EMP_ROLE, [body?.role, new_employee_id, body?.reporting]);
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

const deleteEmployee = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId; // check permission to create a customer
    try {
        return res.status(200).json(
            successHandler({
            }, 'Employee delete Successfully !', 200)
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}
const editEmployee = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId; // check permission to create a customer
    try {
        return res.status(200).json(
            successHandler({
            }, 'Employee delete Successfully !', 200)
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

const createRole = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId; // check permission for this id to create a customer
    const { body } = req;
    const new_role_id = uuid().split('-')[0];
    const values = [
        new_role_id,
        body?.role_name,
        body?.role_description,
        body?.department,
        body?.level
    ]
    try {
        const res1 = await connection.execute(CREATE_ROLE, values);
        return res.status(200).json(
            successHandler({
            }, 'Role Created Successfully !', 201)
        )

    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}
const createPermission = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId; // check permission for this id to create a customer
    const { body } = req;
    const new_permission_id = uuid().split('-')[0];
    const values = [
        new_permission_id,
        body?.permission_name,
        body?.permission_description
    ]
    try {
        const res1 = await connection.execute(CREATE_PERMISSION, values);
        return res.status(200).json(
            successHandler({
            }, 'Permission Created Successfully !', 201)
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

const getRoles = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId; // check permission for this id to create a customer
    try {
        const res1 = await connection.execute(GET_ROLES);
        return res.status(200).json(
            successHandler(
                res1[0]
                , 'Employee roles', 200)
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}
const getPermissions = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId; // check permission for this id to create a customer
    try {
        const res1 = await connection.execute(GET_PERMISSIONS);
        return res.status(200).json(
            successHandler(
                res1[0]
                , 'Employee Permissions', 200)
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

const getEmployeePermissions = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId;
    try {
        const cacheResponse = await getCache(`employee:${employee_id}:all-permissions`);
        if (cacheResponse) {
            console.log('fromcache')
            return res.status(200).json(
                cacheResponse
            )
        }
        const response = await connection.execute(GET_EMPLOYEE_PERMISSIONS);

        // cache the data
        const cacheKey = generateCacheKey('employee', `${employee_id}`, 'all-permissions');
        await setCache(cacheKey,
            successHandler(
                response[0]
                ,
                "Employees permissions",
                200,
            )
        )
        return res.status(200).json(
            successHandler(
                response[0]
                ,
                "Employees Permissions.",
                200,
            )
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

// add permissions to the new employee
const addPermissions = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId; // check permission for this id to attach permissions to employee
    try {
        const { employee_role_id, permission_id } = req.body;
        if (!employee_role_id || !permission_id) {
            const err = new Error('premission_id/employee_role_id is required !')
            return next(err)
        }
        const alreadyExists = await connection.execute(GET_PERMISSION, [permission_id, employee_role_id]);
        if (alreadyExists[0].length) {
            return res.status(200).json(
                successHandler(
                    {}
                    , 'Permission Already Added', 200)
            )
        }
        const response = await connection.execute(ADD_PERMISSION, [permission_id, employee_role_id])
        return res.status(200).json(
            successHandler(
                {}
                , 'Permission Added', 200)
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}

const removePermissions = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId; // check permission for this id to attach permissions to employee
    try {
        const { employee_role_id, permission_id } = req.body;
        if (!employee_role_id || !permission_id) {
            const err = new Error('premission_id/employee_role_id is required !')
            return next(err)
        }
        const alreadyExists = await connection.execute(GET_PERMISSION, [permission_id, employee_role_id]);
        if (alreadyExists[0].length) {
            const response = await connection.execute(DELETE_PERMISSION, [permission_id, employee_role_id])
            return res.status(200).json(
                successHandler(
                    {}
                    , 'Permission Removed !', 200)
            )
        }
        return res.status(200).json(
            successHandler(
                {}
                , 'Permission Not Found !', 200)
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}


module.exports = { addPermissions, getEmployeeProfile, getAgentProfiles, getEmployeeProfiles, getCustomerProfiles, getClaims, createEmployee, createRole, createPermission, getRoles, getPermissions, removePermissions, deleteEmployee, editEmployee, getEmployeePermissions }