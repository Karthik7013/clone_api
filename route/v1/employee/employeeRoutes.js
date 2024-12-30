const { Router } = require('express');
const isAuthenticated = require('../../../middleware/auth');
const { getEmployeeProfile, getAgentProfiles, getEmployeeProfiles, getCustomerProfiles } = require('../../../controller/employeeController');

const employeeRoutes = Router();
employeeRoutes.get('/profile', isAuthenticated(['employee']), getEmployeeProfile)
employeeRoutes.get('/customers', getCustomerProfiles)
employeeRoutes.get('/employees', isAuthenticated(['employee']), getEmployeeProfiles)
employeeRoutes.get('/agents', isAuthenticated(['employee']), getAgentProfiles)

module.exports = employeeRoutes;