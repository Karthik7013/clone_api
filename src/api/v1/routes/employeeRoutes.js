const { Router } = require('express');
const isAuthenticated = require('../../middleware/auth');
const { getEmployeeProfile, getAgentProfiles, getEmployeeProfiles, getCustomerProfiles, getClaims, createEmployee, createPermission, createRole, getRoles, getPermissions, addPermissions, removePermissions, deleteEmployee, editEmployee } = require('../controller/employeeController');
const isAuthorized = require('../../middleware/authorization');

const employeeRoutes = Router();
employeeRoutes.get('/profile', isAuthenticated(['employee']), getEmployeeProfile)
employeeRoutes.get('/customers', isAuthenticated(['employee']), getCustomerProfiles)
employeeRoutes.get('/employees', isAuthenticated(['employee']), isAuthorized('751c28f6'), getEmployeeProfiles)
employeeRoutes.get('/agents', isAuthenticated(['employee']), getAgentProfiles)
employeeRoutes.get('/claims', isAuthenticated(['employee']), getClaims)
employeeRoutes.post('/create-new-employee', isAuthenticated(['employee']), isAuthorized('a9709de8'), createEmployee);
employeeRoutes.delete('/delete', isAuthenticated(['employee']), deleteEmployee);
employeeRoutes.post('/edit', isAuthenticated(['employee']), editEmployee);
employeeRoutes.get('/get-roles', isAuthenticated(['employee']), getRoles);
employeeRoutes.get('/get-permissions', isAuthenticated(['employee']), getPermissions);
// create - new- employee

employeeRoutes.post('/create-role', isAuthenticated(['employee']), createRole);
employeeRoutes.post('/create-permission', isAuthenticated(['employee']), createPermission);
employeeRoutes.post('/attach-permissions', isAuthenticated(['employee']), addPermissions);
employeeRoutes.post('/remove-permissions', isAuthenticated(['employee']), removePermissions)


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