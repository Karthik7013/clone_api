require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token) {
            jwt.verify(token, jwtSecretKey, (err, decoded) => {
                if (err) {
                    const err = new Error("Unauthorized access");
                    err.status = 401;
                    return next(err);
                }
                req.auth = decoded;
                next();
            });
        } else {
            const error = new Error("Token not found");
            error.status = 401;
            next(error);
        }
    } else {
        const error = new Error("Authorization header missing or malformed");
        error.status = 401;
        next(error);
    }
};

module.exports = isAuthenticated;
