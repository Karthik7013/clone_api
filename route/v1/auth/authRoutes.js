const { Router } = require('express');
const { verfiyAgent,
    verfiyCustomer,
    verfiyEmployee,
    createCustomer,
    createAgent,
    createEmployee,
    getAccessToken,
    signOut
} = require('../../../controller/authController');

const authRoutes = Router();

authRoutes.post('/signup/customer', createCustomer)
authRoutes.post('/signup/agent', createAgent)
authRoutes.post('/signup/employee', createEmployee)

authRoutes.post('/customer/verify', verfiyCustomer)
authRoutes.post('/agent/verify', verfiyAgent)
authRoutes.post('/employee/verify', verfiyEmployee)

authRoutes.post('/customer/signOut', signOut)
authRoutes.post('/agent/signOut', signOut)
authRoutes.post('/employee/signOut', signOut)

authRoutes.post('/generate-access-token', getAccessToken)

module.exports = authRoutes;