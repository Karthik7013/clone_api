const connectToDatabase = require("../db/db");
const jwt = require('jsonwebtoken');
const { GET_CUSTOMER_PHONE, GET_AGENT_PHONE, GET_EMPLOYEE_PHONE, CREATE_CUSTOMER, CREATE_AGENT, CREATE_EMPLOYEE, GET_CUSTOMER_MAX_ID, GET_AGENT_MAX_ID, GET_EMPLOYEE_MAX_ID, GET_CUSTOMER_ID, GET_EMPLOYEE_ID, GET_AGENT_ID } = require("../db/queries/queries.constants");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// @desc     verify customer number
// @route    /verify/customer
// @access   public
const verfiyCustomer = async (req, res, next) => {
    const connection = await connectToDatabase();
    try {
        const { phone } = req.body;
        const [results] = await connection.execute(GET_CUSTOMER_PHONE, [phone]); // Execute the query
        if (!results.length) {
            const err = new Error('Customer Not Found !');
            err.status = 404;
            err.code = 'this is code';
            err.details = 'this is message';
            return next(err)
        }
        const loginCredentials = {
            loginId: results[0].customer_id,
            type: 'customer'
        }
        const token = jwt.sign(loginCredentials, jwtSecretKey, { expiresIn: '1h' });
        return res.status(200).json(
            {
                "success": true,
                "message": "User found.",
                "status": 200,
                "data": { accessToken: token, exp: "1h" },
                "timestamp": "2024-10-06T12:34:56Z"
            }
        )
    } catch (error) {
        error.status = 500;
        return next(error);
    } finally {
        await connection.end();
    }
}

// @desc     verify agent number
// @route    /verify/agent
// @access   public
const verfiyAgent = async (req, res, next) => {
    const connection = await connectToDatabase();
    try {
        const { phone } = req.body;
        const [results] = await connection.execute(GET_AGENT_PHONE, [phone]);
        if (!results.length) {
            const err = new Error('Agent Not Found !');
            err.status = 404;
            err.code = 'this is code';
            err.details = 'this is message';
            return next(err)
        }
        const loginCredentials = {
            loginId: results[0].agent_id,
            type: 'agent'
        }
        const token = jwt.sign(loginCredentials, jwtSecretKey, { expiresIn: '1h' });
        return res.status(200).json(
            {
                "success": true,
                "message": "User found.",
                "status": 200,
                "data": { accessToken: token, exp: "1h" },
                "timestamp": "2024-10-06T12:34:56Z"
            }
        )
    } catch (error) {
        error.status = 500;
        return next(error);
    } finally {
        await connection.end();
    }
}

// @desc     verify employee number
// @route    /verify/employee
// @access   public
const verfiyEmployee = async (req, res, next) => {
    const connection = await connectToDatabase();
    try {
        const { phone } = req.body;
        const [results] = await connection.execute(GET_EMPLOYEE_PHONE, [phone]); // Execute the query
        if (!results.length) {
            const err = new Error('Employee Not Found !');
            err.status = 404;
            err.code = 'this is code';
            err.details = 'this is message';
            return next(err)
        }
        const loginCredentials = {
            loginId: results[0].employee_id,
            type: 'employee'
        }
        const token = jwt.sign(loginCredentials, jwtSecretKey, { expiresIn: '1h' });
        return res.status(200).json(
            {
                "success": true,
                "message": "User found.",
                "status": 200,
                "data": { accessToken: token, exp: "1h" },
                "timestamp": "2024-10-06T12:34:56Z"
            }
        )
    } catch (error) {
        error.status = 500;
        return next(error);
    } finally {
        await connection.end();
    }
}

const generateCustomerId = async (callback) => {
    const connection = await connectToDatabase();
    try {
        const res = await connection.execute(GET_CUSTOMER_MAX_ID)
        const newId = res[0][0].max_id + 1;
        const formattedId = `CUST${String(newId).padStart(4, '0')}`;
        callback(formattedId)
    } catch (error) {
        error.status = 500;
        return next(error);
    }
    finally {
        await connection.end()
    }
}
const generateAgentId = async (callback) => {
    const connection = await connectToDatabase();
    try {
        const res = await connection.execute(GET_AGENT_MAX_ID)
        const newId = res[0][0].max_id + 1;
        const formattedId = `AGENT${String(newId).padStart(4, '0')}`;
        callback(formattedId)
    } catch (error) {
        error.status = 500;
        return next(error);
    }
    finally {
        await connection.end()
    }
}
const generateEmployeeId = async (callback) => {
    const connection = await connectToDatabase();
    try {
        const res = await connection.execute(GET_EMPLOYEE_MAX_ID)
        const newId = res[0][0].max_id + 1;
        const formattedId = `EMP${String(newId).padStart(4, '0')}`;
        callback(formattedId)
    } catch (error) {
        error.status = 500;
        return next(error);
    }
    finally {
        await connection.end()
    }
}

// @desc     create new customer
// @route    /signup/customer
// @access   public
const createCustomer = async (req, res, next) => {
    const connection = await connectToDatabase();
    generateCustomerId(async (customer_id) => {
        try {
            const { first_name, last_name, phone } = req.body;
            const VALUES = [customer_id, first_name, last_name, phone, new Date()]
            await connection.execute(CREATE_CUSTOMER, VALUES);
            return res.status(201).json(
                {
                    "success": true,
                    "message": "Customer created successfully.",
                    "status": 201,
                    "data": {
                        customer_id,
                        first_name,
                        last_name,
                        phone
                    },
                    "timestamp": new Date()
                }
            )
        } catch (error) {
            error.status = 500;
            return next(error);
        } finally {
            await connection.end();
        }

    })
}
// @desc     create new Agent
// @route    /signup/agent
// @access   public
const createAgent = async (req, res, next) => {
    const connection = await connectToDatabase();
    generateAgentId(async (agent_id) => {
        try {
            const { first_name, last_name, phone } = req.body;
            const VALUES = [agent_id, first_name, last_name, phone, new Date()]
            await connection.execute(CREATE_AGENT, VALUES);
            return res.status(201).json(
                {
                    "success": true,
                    "message": "Agent created successfully.",
                    "status": 201,
                    "data": {
                        agent_id,
                        first_name,
                        last_name,
                        phone,
                    },
                    "timestamp": new Date()
                }
            )
        } catch (error) {
            error.status = 500;
            return next(error);
        } finally {
            await connection.end();
        }
    })

}
// @desc     create new Employee
// @route    /signup/employee
// @access   public
const createEmployee = async (req, res, next) => {
    const connection = await connectToDatabase();
    generateEmployeeId(async (employee_id) => {
        try {
            const {
                first_name,
                last_name,
                phone,
                email,
                dob,
                gender,
                address_line1,
                address_line2,
                state,
                city,
                pincode,
                country,
                position,
                department,
                hire_date,
                salary,
            } = req.body;
            const VALUES = [employee_id,
                first_name,
                last_name,
                phone,
                email,
                dob,
                gender,
                address_line1,
                address_line2,
                state,
                city,
                pincode,
                country,
                position,
                department,
                hire_date,
                salary, new Date()]
            await connection.execute(CREATE_EMPLOYEE, VALUES);
            return res.status(201).json(
                {
                    "success": true,
                    "message": "Employee created successfully.",
                    "status": 201,
                    "data": {
                        employee_id,
                        first_name,
                        last_name,
                        phone,
                        email,
                        dob,
                        gender,
                        address_line1,
                        address_line2,
                        state,
                        city,
                        pincode,
                        country,
                        position,
                        department,
                        hire_date,
                        salary
                    },
                    "timestamp": new Date()
                }
            )
        } catch (error) {
            error.status = 500;
            return next(error);
        } finally {
            await connection.end();
        }
    })
}


// @desc     get customer profile
// @route    /profile/customer
// @access   private
const getCustomerProfile = async (req, res, next) => {
    const connection = await connectToDatabase();
    const customer_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_CUSTOMER_ID, [customer_id]);
        return res.status(200).json(
            {
                "success": true,
                "message": "Customer found.",
                "status": 200,
                "data": response[0][0],
                "timestamp": "2024-10-06T12:34:56Z"
            }
        )
    } catch (error) {
        next(error)
    }
}

// @desc     get agent profile
// @route    /profile/agent
// @access   private
const getAgentProfile = async (req, res, next) => {
    const connection = await connectToDatabase();
    const agent_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_AGENT_ID, [agent_id]);
        return res.status(200).json(
            {
                "success": true,
                "message": "Agent found.",
                "status": 200,
                "data": response[0][0],
                "timestamp": new Date()
            }
        )
    } catch (error) {
        next(error)
    }
}

// @desc     get employee profile
// @route    /profile/employee
// @access   private
const getEmployeeProfile = async (req, res, next) => {

    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_EMPLOYEE_ID, [employee_id]);
        return res.status(200).json(
            {
                "success": true,
                "message": "Employee found.",
                "status": 200,
                "data": response[0][0],
                "timestamp": new Date()
            }
        )
    } catch (error) {
        next(error)
    }
    // res.send({ msg: 'your are real customer', data: req.auth })
}

module.exports = { verfiyCustomer, verfiyAgent, verfiyEmployee, createCustomer, createAgent, createEmployee, getCustomerProfile, getEmployeeProfile, getAgentProfile };