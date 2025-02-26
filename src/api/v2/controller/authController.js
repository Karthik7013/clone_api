const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const connectToDatabase = require("../../config/db");
const { GET_CUSTOMER_PHONE, GET_AGENT_PHONE, GET_EMPLOYEE_PHONE, CREATE_CUSTOMER, CREATE_AGENT, CREATE_EMPLOYEE, INSERT_REFRESH_TOKEN } = require("../../config/queries.constants");
const successHandler = require("../../middleware/successHandler");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRES
const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRES;
const transporter = require('../service/transporter');

// @desc     verify customer number
// @route    /verify/customer
// @access   public
const verfiyCustomer = async (phone) => {
    const connection = await connectToDatabase();
    try {
        if (!connection) throw new Error("Error in connecting to db")
        const [results] = await connection.execute(GET_CUSTOMER_PHONE, [phone]); // Execute the query
        if (!results.length) {
            const err = new Error('Customer Not Found !');
            err.status = 404;
            err.code = 'this is code';
            err.details = 'this is message';
            throw err
        }
        const customer_id = results[0].customer_id;
        const loginCredentials = {
            loginId: customer_id,
            type: 'customer'
        }

        const accessToken = jwt.sign(loginCredentials, jwtSecretKey, { expiresIn: accessTokenExpire });
        const refreshToken = jwt.sign(loginCredentials, jwtRefreshSecretKey, { expiresIn: refreshTokenExpire });
        return {
            accessToken,
            refreshToken,
            exp: accessTokenExpire,
            role: 'customer',
        }
    } catch (error) {
        throw error
    } finally {
        if (connection) await connection.end();
    }
}

// @desc     verify agent number
// @route    /verify/agent
// @access   public
const verfiyAgent = async (req, res, next) => {
    const user_agent = req.headers['user-agent'];
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let connection = await connectToDatabase();
    try {
        if (!connection) {
            const dbTimeOutErr = new Error("Error in connecting to db");
            next(dbTimeOutErr)
        }
        const { phone } = req.body;
        if (!phone) {
            const agentErr = new Error("Agent Phone Number is Required !");
            next(agentErr)
        }
        const [results] = await connection.execute(GET_AGENT_PHONE, [phone]);
        if (!results.length) {
            const err = new Error('Agent Not Found !');
            err.status = 404;
            err.code = 'this is code';
            err.details = 'this is message';
            return next(err)
        }
        const agent_id = results[0].agent_id;
        const loginCredentials = {
            loginId: agent_id,
            type: 'agent'
        }
        const accessToken = jwt.sign(loginCredentials, jwtSecretKey, { expiresIn: accessTokenExpire });
        const refreshToken = jwt.sign(loginCredentials, jwtRefreshSecretKey, { expiresIn: refreshTokenExpire });
        await connection.execute(INSERT_REFRESH_TOKEN, [null, null, agent_id, refreshToken, new Date(), user_agent, ipAddress])
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 3600000,
            secure: process.env.NODE_ENV === 'PRODUCTION'
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 900000,
            secure: process.env.NODE_ENV === 'PRODUCTION'
        });

        res.cookie('role', 'agent', {
            httpOnly: true,
            maxAge: 3600000,
            secure: process.env.NODE_ENV === 'PRODUCTION'
        });
        return res.status(200).json(
            successHandler({
                accessToken,
                exp: accessTokenExpire,
                role: 'agent',
            },
                "Login Success",
                200
            )
        )


    } catch (error) {
        error.status = 500;
        return next(error);
    }
    finally {
        if (connection) await connection.end();
    }
}

// @desc     verify employee number
// @route    /verify/employee
// @access   public
const verfiyEmployee = async (req, res, next) => {
    const user_agent = req.headers['user-agent'];
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const connection = await connectToDatabase();
    try {
        if (!connection) {
            const dbTimeOutErr = new Error("Error in connecting to db");
            next(dbTimeOutErr)
        }
        const { phone } = req.body;
        if (!phone) {
            const agentErr = new Error("Employee Phone Number is Required !");
            next(agentErr)
        }
        const [results] = await connection.execute(GET_EMPLOYEE_PHONE, [phone]);
        if (!results.length) {
            const err = new Error('Employee Not Found !');
            err.status = 404;
            err.code = 'this is code';
            err.details = 'this is message';
            return next(err)
        }
        const employee_id = results[0].employee_id
        const loginCredentials = {
            loginId: employee_id,
            type: 'employee'
        }
        const accessToken = jwt.sign(loginCredentials, jwtSecretKey, { expiresIn: accessTokenExpire });
        const refreshToken = jwt.sign(loginCredentials, jwtRefreshSecretKey, { expiresIn: refreshTokenExpire });
        await connection.execute(INSERT_REFRESH_TOKEN, [null, employee_id, null, refreshToken, new Date(), user_agent, ipAddress])
        res.cookie('refreshToken', refreshToken, {
            // httpOnly: true,
            // maxAge: 3600000,
            // secure: process.env.NODE_ENV === 'PRODUCTION' && req.secure,
            // sameSite: process.env.NODE_ENV === 'PRODUCTION' ? 'Strict' : 'Lax'
            sameSite: 'None',
            secure: true
        });

        res.cookie('accessToken', accessToken, {
            // httpOnly: true,
            // maxAge: 900000,
            // secure: process.env.NODE_ENV === 'PRODUCTION' && req.secure,
            // sameSite: process.env.NODE_ENV === 'PRODUCTION' ? 'Strict' : 'Lax',
            sameSite: 'None',
            secure: true
        });

        res.cookie('role', 'employee', {
            // httpOnly: true,
            // maxAge: 3600000,
            // secure: process.env.NODE_ENV === 'PRODUCTION' && req.secure,
            // sameSite: process.env.NODE_ENV === 'PRODUCTION' ? 'Strict' : 'Lax',
            sameSite: 'None',
            secure: true
        });

        return res.status(200).json(
            successHandler({
                accessToken,
                exp: accessTokenExpire,
                role: 'employee',
            },
                "Login Success",
                200
            )
        )
    } catch (error) {
        error.status = 500;
        return next(error);
    } finally {
        if (connection) await connection.end();
    }
}

// @desc     logout user
// @route    /logout
// @access   public
const signOut = async (req, res, next) => {
    const connection = await connectToDatabase();
    const { refreshToken } = req.cookies;

    try {
        // if (!refreshToken) {
        //     const err = new Error('Not Authenticated');
        //     err.status = 403;
        //     err.code = 'this is code';
        //     err.details = 'this is message';
        //     return next(err)
        // }
        // await connection.execute(DELETE_REFRESH_TOKEN, [refreshToken]);


        res.clearCookie('refreshToken', {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === 'PRODUCTION', // Only clear in production if cookie is secure
            // sameSite: 'None', // Same SameSite setting used while setting cookies
            // path: '/' // Match the path you set when the cookie was created
        });

        res.clearCookie('accessToken', {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === 'PRODUCTION',
            // sameSite: 'None',
            // path: '/'
        });

        res.clearCookie('role', {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === 'PRODUCTION',
            // sameSite: 'None',
            // path: '/'
        });


        return res.status(200).json(
            successHandler(null,
                "Logout Successfull",
                204
            )
        )
    } catch (error) {
        error.status = 500;
        console.log(error)
        return next(error);
    }
    finally {
        if (connection) await connection.end();
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

// @desc     get access token
// @route    /generate-access-token
// @access   public
const getAccessToken = (req, res, next) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
        const err = new Error('Token not found');
        err.status = 401;
        err.code = 'this is code';
        err.details = 'Refresh token not found';
        return next(err)
        // return res.redirect('http://localhost:5173')
    }
    try {

        jwt.verify(refreshToken, jwtRefreshSecretKey, (err, decode) => {
            if (err) {
                const err = new Error("Token expired/invalid !");
                err.status = 403;
                return next(err);
            }
            const loginCredentials = {
                loginId: decode.loginId, type: decode.type,
            }
            const accessToken = jwt.sign(loginCredentials, jwtSecretKey, { expiresIn: accessTokenExpire });
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: true })
            return res.status(200).json(
                successHandler({
                    accessToken,
                    exp: accessTokenExpire,
                },
                    "token generated successfully",
                    200
                )
            )

        })
    } catch (error) {
        // return res.redirect('http://localhost:5173')
        next(error)
    }
}

module.exports = { verfiyCustomer, verfiyAgent, verfiyEmployee, createCustomer, createAgent, createEmployee, getAccessToken, signOut };