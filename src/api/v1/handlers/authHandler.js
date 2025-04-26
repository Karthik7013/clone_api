const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRES
const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRES;
const connectToDatabase = require('../../config/db');
const { GET_EMPLOYEE_PHONE, GET_CUSTOMER_PHONE, GET_CUSTOMER_DETAILS } = require('../../config/queries.constants');
const otpHandler = require('./otpHandler');


/**
 * check the customer with email/phone 
 * @param {*} req 
 * @returns 
 */
const sendCustomer = async (phone) => {
    let connection;
    try {
        connection = await connectToDatabase();
        if (!connection) {
            const dbTimeOutErr = new Error("Error in connecting to db");
            throw dbTimeOutErr
        }
        const [results] = await connection.execute(GET_CUSTOMER_DETAILS, [phone, phone]); // Execute the query
        if (!results.length) {
            const err = new Error('Customer Not Found !');
            throw err
        }
        const email = results[0].email;
        const name = results[0].firstname;
        const payload = {
            customer_id: results[0].customer_id,
            role: "customer",
            permissions: []
        }
        const response = await otpHandler.sendOtp2Email(email, name, payload);
        return response;
    } catch (error) {
        error.status = 500;
        throw error
    } finally {
        if (connection) await connection.end();
    }
}

const verifyCustomer = async (otp, messageId) => {
    let connection;
    try {
        connection = await connectToDatabase();
        if (!connection) {
            const dbTimeOutErr = new Error("Error in connecting to db");
            throw dbTimeOutErr
        }
        const response = otpHandler.verifyOtp(otp, messageId)
        return response;
    } catch (error) {
        error.status = 500;
        throw error
    } finally {
        if (connection) await connection.end();
    }
}




/**
 * check the agent with email/phone 
 * @param {*} req 
 * @returns 
 */
const verfiyAgent = async (req) => {
    const user_agent = req.headers['user-agent'];
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let connection = await connectToDatabase();
    try {
        if (!connection) {
            const dbTimeOutErr = new Error("Error in connecting to db");
            throw dbTimeOutErr
        }
        const { phone } = req.body;
        if (!phone) {
            const agentErr = new Error("Agent Phone Number is Required !");
            throw agentErr
        }
        const [results] = await connection.execute(GET_AGENT_PHONE, [phone]);
        if (!results.length) {
            const err = new Error('Agent Not Found !');
            err.status = 404;
            err.code = 'this is code';
            err.details = 'this is message';
            throw err
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
            // httpOnly: true,
            // maxAge: 3600000,
            // secure: process.env.NODE_ENV === 'PRODUCTION'
            sameSite: 'None',
            secure: true
        });

        res.cookie('accessToken', accessToken, {
            // httpOnly: true,
            // maxAge: 900000,
            // secure: process.env.NODE_ENV === 'PRODUCTION',
            sameSite: 'None',
            secure: true
        });

        res.cookie('role', 'agent', {
            // httpOnly: true,
            // maxAge: 3600000,
            // secure: process.env.NODE_ENV === 'PRODUCTION'
            sameSite: 'None',
            secure: true
        });
        return {
            accessToken,
            exp: accessTokenExpire,
            role: 'agent',
        }


    } catch (error) {
        error.status = 500;
        throw error
    }
    finally {
        if (connection) await connection.end();
    }
}

/**
 * check the employee with email/phone 
 * @param {*} req 
 * @returns 
 */
const verfiyEmployee = async (req) => {
    const user_agent = req.headers['user-agent'];
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const connection = await connectToDatabase();
    try {
        if (!connection) {
            const dbTimeOutErr = new Error("Error in connecting to db");
            throw dbTimeOutErr
        }
        const { phone } = req.body;
        if (!phone) {
            const agentErr = new Error("Employee Phone Number is Required !");
            throw agentErr;
        }
        const [results] = await connection.execute(GET_EMPLOYEE_PHONE, [phone]);
        if (!results.length) {
            const err = new Error('Employee Not Found !');
            err.status = 404;
            err.code = 'this is code';
            err.details = 'this is message';
            throw err
        }
        const employee_id = results[0].employee_id
        const loginCredentials = {
            loginId: employee_id,
            type: 'employee'
        }
        const accessToken = jwt.sign(loginCredentials, jwtSecretKey, { expiresIn: accessTokenExpire });
        const refreshToken = jwt.sign(loginCredentials, jwtRefreshSecretKey, { expiresIn: refreshTokenExpire });
        await connection.execute(INSERT_REFRESH_TOKEN, [null, employee_id, null, refreshToken, new Date(), user_agent, ipAddress])
        return {
            accessToken,
            exp: accessTokenExpire,
            role: 'employee',
        }
    } catch (error) {
        error.status = 500;
        throw error
    } finally {
        if (connection) await connection.end();
    }
}

/**
 * Remove access and refresh token from the cookies.
 * 
 * 
 */
const signOut = async (req) => {
    const connection = await connectToDatabase();
    const { refreshToken } = req.cookies;
    try {
        // if (!refreshToken) {
        //     const err = new Error('Not Authenticated');
        //     err.status = 403;
        //     err.code = 'this is code';
        //     err.details = 'this is message';
        //     throw err
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
        return {}
    } catch (error) {
        error.status = 500;
        throw error
    }
    finally {
        if (connection) await connection.end();
    }
}

/**
 * Generates and returns a new access token based on the incoming request.
 * @param {*} req 
 * 
 */
const getAccessToken = (req) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
        const err = new Error('Token not found');
        err.status = 401;
        err.code = 'this is code';
        err.details = 'Refresh token not found';
        throw err
        // return res.redirect('http://localhost:5173')
    }
    try {

        jwt.verify(refreshToken, jwtRefreshSecretKey, (err, decode) => {
            if (err) {
                const err = new Error("Token expired/invalid !");
                err.status = 403;
                throw err
            }
            const loginCredentials = {
                loginId: decode.loginId, type: decode.type,
            }
            const accessToken = jwt.sign(loginCredentials, jwtSecretKey, { expiresIn: accessTokenExpire });
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: true })
            return {
                accessToken,
                exp: accessTokenExpire,
            }
        })
    } catch (error) {
        // return res.redirect('http://localhost:5173')
        throw error
    }
}

module.exports = {
    verifyCustomer,
    sendCustomer,
    verfiyAgent,
    verfiyEmployee,
    signOut,
    getAccessToken,
}