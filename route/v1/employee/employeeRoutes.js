const { Router } = require('express');
const isAuthenticated = require('../../../middleware/auth');
const { getEmployeeProfile, getAgentProfiles, getEmployeeProfiles, getCustomerProfiles, getClaims, createEmployee } = require('../../../controller/employeeController');

const employeeRoutes = Router();
employeeRoutes.get('/profile', isAuthenticated(['employee']), getEmployeeProfile)
employeeRoutes.get('/customers', isAuthenticated(['employee']), getCustomerProfiles)
employeeRoutes.get('/employees', isAuthenticated(['employee']), getEmployeeProfiles)
employeeRoutes.get('/agents', isAuthenticated(['employee']), getAgentProfiles)
employeeRoutes.get('/claims', isAuthenticated(['employee']), getClaims)
employeeRoutes.post('/create-new-employee', isAuthenticated(['employee']), createEmployee)

module.exports = employeeRoutes;


/**
 * create a employee /add-employee
 * edit permissision /update-employee
 * claims list actions approve reject pending 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * */ 