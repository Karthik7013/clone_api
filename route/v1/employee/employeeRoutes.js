const { Router } = require('express');
const isAuthenticated = require('../../../middleware/auth');
const { getEmployeeProfile, getAgentProfiles, getEmployeeProfiles, getCustomerProfiles, getClaims, createEmployee, createPermission, createRole, getRoles, getPermissions } = require('../../../controller/employeeController');

const employeeRoutes = Router();
employeeRoutes.get('/profile', isAuthenticated(['employee']), getEmployeeProfile)
employeeRoutes.get('/customers', isAuthenticated(['employee']), getCustomerProfiles)
employeeRoutes.get('/employees', isAuthenticated(['employee']), getEmployeeProfiles)
employeeRoutes.get('/agents', isAuthenticated(['employee']), getAgentProfiles)
employeeRoutes.get('/claims', isAuthenticated(['employee']), getClaims)
employeeRoutes.post('/create-new-employee', isAuthenticated(['employee']), createEmployee);
employeeRoutes.get('/get-roles', isAuthenticated(['employee']), getRoles);
employeeRoutes.get('/get-permissions', isAuthenticated(['employee']), getPermissions);
// create - new- employee



employeeRoutes.post('/create-role', isAuthenticated(['employee']), createRole);
employeeRoutes.post('/create-permission', isAuthenticated(['employee']), createPermission);



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