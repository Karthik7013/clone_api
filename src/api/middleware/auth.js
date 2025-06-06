require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY

const isAuthenticated = (role) => {
    return (req, res, next) => {
        const accessToken = req.cookies?.accessToken;
        if (accessToken) {
            jwt.verify(accessToken, jwtSecretKey, (err, decoded) => {
                if (err) {
                    const err = new Error("Unauthorized access");
                    err.status = 401;
                    return next(err);
                }
                if (!role.includes(decoded.role)) {
                    const err = new Error('Access Denied for this login');
                    return next(err);
                }
                req.auth = decoded;
                next()
            });
        } else {
            const error = new Error("Authorization header missing or malformed");
            error.status = 401;
            next(error);
        }
    }
};

module.exports = isAuthenticated;