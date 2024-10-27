require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY

const isAuthenticated = (role) => {
    return (req, res, next) => {
        const refreshToken = req.cookies?.refreshToken
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const accessToken = authHeader.split(' ')[1];
            if (accessToken) {
                jwt.verify(accessToken, jwtSecretKey, (err, decoded) => {
                    if (err) {
                        // jwt.verify(refreshToken, jwtRefreshSecretKey, (err, decode) => {
                        //     if (err) {
                        //         const err = new Error("Unauthorized access");
                        //         err.status = 401;
                        //         return next(err);
                        //     } else {
                        //         // generate new access token
                        //         console.log(decode, 'decode')

                        //         req.auth = decode;
                        //         return next()
                        //     }
                        // })

                        const err = new Error("Unauthorized access");
                        err.status = 401;
                        return next(err);
                    }
                    // console.log(decoded, 'decoded')
                    if (!role.includes(decoded.type)) {
                        const err = new Error('Access Denied for this login');
                        return next(err);
                    }
                    req.auth = decoded;
                    next()

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
    }
};

module.exports = isAuthenticated;
