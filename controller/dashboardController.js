const { newCustomerProfile } = require('../data/profiles');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const verifyCustomerNumber = async (req, res, next) => {
    try {
        const phno = req.body.phno;
        if (!phno) {
            const err = new Error("Phone Number is required !");
            err.status = 400;
            next(err)
        } else {
            // get the profile based on phno; add customer id to encrypt data
            const token = jwt.sign({
                id: newCustomerProfile.custId
            }, jwtSecretKey, { expiresIn: '1h' });
            return res.status(200).json({ status: 200, token, exp: "1h" })
        }
    } catch (err) {
        err.status = 500;
        return next(err);
    }
};


const getCustomerProfile = async (req, res, next) => {
    try {
        res.send(req.customer)
    } catch (error) {
        error.status = 500;
        next(error)
    }
}

module.exports = { verifyCustomerNumber, getCustomerProfile };
