const { newCustomerProfile, newPospProfile, newPospProfilePending, newCeoProfile, newHrProfile } = require('../data/profiles');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const profile = {
    "9999999999": newCeoProfile,
    "8888888888": newHrProfile,
    "7777777777": newCustomerProfile,
    "6666666666": newPospProfile,
    "5555555555": newPospProfilePending
}
//=================||customer-controllers||===============//

// @desc     verify customer number
// @route    /customer/verify
// @access   public
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

// @desc     verify customer number
// @route    /customer/profile
// @access   private
const getCustomerProfile = async (req, res, next) => {
    try {
        res.send(newCustomerProfile)
    } catch (error) {
        error.status = 500;
        next(error)
    }
}

const getCustomerStats = async (req, res, next) => {
    return res.send({
        stats: {
            purchase: 2,
            approved: 0,
            rejected: 1,
            pending: 3
        }
    })
}

const getCustomerPolicies = async (req, res, next) => {
    return res.send([{ policyId: 1234, policyDate: '26/11/1999', exp: '26/11/2046' }])
}

const getCutomerClaims = (req, res, next) => {
    return res.send([{
        policyId: 1234,
        claim_status: 'pending',
        message: 'pending at ceo',
    }])
}

//=================||posp-controllers||===============//

// @desc     verify number
// @route    /verify
// @access   public
const verifyPospNumber = async (req, res, next) => {
    try {
        const phno = req.body.phno;
        if (!phno) {
            const err = new Error("Phone Number is required !");
            err.status = 400;
            next(err)
        } else {
            if (!profile[phno]) return res.status(404).json({ msg: 'no user found' })

            // get the profile based on phno; add posp id to encrypt data
            const loginCredentials = {
                type: profile[phno].type,
                id: profile[phno].custId || profile[phno].empId || profile[phno].pospId
            }
            const token = jwt.sign(loginCredentials, jwtSecretKey, { expiresIn: '1h' });
            return res.status(200).json({ status: 200, token, exp: "1h" })
        }
    } catch (err) {
        err.status = 500;
        return next(err);
    }
}

// @desc      get profile 
// @route    /profile
// @access   private
const getPospProfile = (req, res, next) => {
    console.log(req.auth) // login id & type 
    try {
        console.log(req.auth.type)
        // take id and type and get profile based on the type (posp | customer | employee)
        res.send(newCustomerProfile)
    } catch (error) {
        error.status = 500;
        next(error)
    }
}

//=================||employee-controllers||===============//

// @desc     verify employee number
// @route    /employee/verify
// @access   public
const verifyEmployeeNumber = async (req, res, next) => {
    try {
        const phno = req.body.phno;
        if (!phno) {
            const err = new Error("Phone Number is required !");
            err.status = 400;
            next(err)
        } else {
            // get the profile based on phno; add posp id to encrypt data
            const token = jwt.sign({
                id: newCeoProfile.empId
            }, jwtSecretKey, { expiresIn: '1h' });
            return res.status(200).json({ status: 200, token, exp: "1h" })
        }
    } catch (err) {
        err.status = 500;
        return next(err);
    }
}

// @desc     verify employee number
// @route    /employee/profile
// @access   private
const getEmployeeProfile = (req, res, next) => {
    try {
        res.send(newCeoProfile)
    } catch (error) {
        error.status = 500;
        next(error)
    }
}



module.exports = {
    verifyCustomerNumber,
    getCustomerProfile,
    getCustomerStats,
    getCustomerPolicies,
    getCutomerClaims,
    verifyPospNumber,
    getPospProfile,
    verifyEmployeeNumber,
    getEmployeeProfile
};
