const { Router } = require('express');
const isAuthenticated = require('../../../middleware/auth')
const { verfiyAgent,
    verfiyCustomer,
    verfiyEmployee,
    createCustomer,
    createAgent,
    createEmployee,
    getCustomerProfile,
    getAgentProfile,
    getEmployeeProfile
} = require('../../../controller/authController')
const authRoutes = Router();




authRoutes.post('/signup/customer', createCustomer)
authRoutes.post('/signup/agent', createAgent)
authRoutes.post('/signup/employee', createEmployee)

authRoutes.post('/verify/customer', verfiyCustomer)
authRoutes.post('/verify/agent', verfiyAgent)
authRoutes.post('/employee/verify', verfiyEmployee)


authRoutes.get('/profile/customer', isAuthenticated(['customer']), getCustomerProfile);
authRoutes.get('/profile/agent',isAuthenticated(['agent']), getAgentProfile);
authRoutes.get('/employee/profile', isAuthenticated(['employee']), getEmployeeProfile);

module.exports = authRoutes;