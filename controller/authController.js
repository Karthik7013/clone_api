const connectToDatabase = require("../db/db");
const jwt = require('jsonwebtoken');
const { GET_CUSTOMER_PHONE, GET_AGENT_PHONE, GET_EMPLOYEE_PHONE, CREATE_CUSTOMER } = require("../db/queries/queries.constants");
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
        console.log(results)
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
        console.log(results)
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
        console.log(results)
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

// @desc     create new customer
// @route    /signup/customer
// @access   public
const createCustomer = async (req, res, next) => {
    const connection = await connectToDatabase();
    try {
        const { first_name, last_name, phone } = req.body;
        const customer_id = 'CUST50106';
        const VALUES = [customer_id, first_name, last_name, phone, new Date()]
        await connection.execute(CREATE_CUSTOMER, VALUES);
        return res.status(201).json(
            {
                "success": true,
                "message": "User created successfully.",
                "status": 201,
                "data": {},
                "timestamp": new Date()
            }
        )
    } catch (error) {
        error.status = 500;
        return next(error);
    } finally {
        await connection.end();
    }
}
// @desc     create new Agent
// @route    /signup/agent
// @access   public
const createAgent = async (req, res, next) => {
    const connection = await connectToDatabase();
    try {
        const { first_name, last_name, phone } = req.body;
        const customer_id = 'CUST0020';
        const VALUES = [customer_id, first_name, last_name, phone, new Date().toDateString()]

        await connection.execute(CREATE_CUSTOMER, VALUES);
        return res.status(201).json(
            {
                "success": true,
                "message": "User created successfully.",
                "status": 201,
                "data": {},
                "timestamp": new Date()
            }
        )
    } catch (error) {
        error.status = 500;
        return next(error);
    } finally {
        await connection.end();
    }
}
// @desc     create new Employee
// @route    /signup/employee
// @access   public
const createEmployee = async (req, res, next) => {
    const connection = await connectToDatabase();
    try {
        const { first_name, last_name, phone } = req.body;
        const customer_id = 'CUST50106';
        const VALUES = [customer_id, first_name, last_name, phone, new Date().toDateString()]
        await connection.execute(CREATE_CUSTOMER, VALUES);
        return res.status(201).json(
            {
                "success": true,
                "message": "User created successfully.",
                "status": 201,
                "data": {},
                "timestamp": new Date()
            }
        )
    } catch (error) {
        error.status = 500;
        return next(error);
    } finally {
        await connection.end();
    }
}


module.exports = { verfiyCustomer, verfiyAgent, verfiyEmployee, createCustomer, createAgent, createEmployee };