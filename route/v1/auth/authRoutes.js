const { Router } = require('express');
const { verfiyAgent, verfiyCustomer, verfiyEmployee, createCustomer, createAgent, createEmployee } = require('../../../controller/authController')
const authRoutes = Router();




authRoutes.post('/signup/customer', createCustomer)
authRoutes.post('/signup/agent', createAgent)
authRoutes.post('/signup/employee', createEmployee)

authRoutes.post('/verify/customer', verfiyCustomer)
authRoutes.post('/verify/agent', verfiyAgent)
authRoutes.post('/verify/employee', verfiyEmployee)


module.exports = authRoutes;