const { Router } = require('express');
const isAuthenticated = require('../../middleware/auth');
const { getEmployeeProfile, getAgentProfiles, getEmployeeProfiles, getCustomerProfiles, getClaims, createEmployee, createPermission, createRole, getRoles, getPermissions, addPermissions, removePermissions, deleteEmployee, editEmployee, getEmployeePermissions } = require('../controller/employeeController');
const isAuthorized = require('../../middleware/authorization');
const connectToDatabase = require('../../config/db');
const successHandler = require('../../middleware/successHandler');

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
employeeRoutes.post('/remove-permissions', isAuthenticated(['employee']), removePermissions);
employeeRoutes.get('/employee-permissions', isAuthenticated(['employee']), getEmployeePermissions)

module.exports = employeeRoutes;

// ============= correct routing system ==============>
employeeRoutes.get('/profiles', async (req, res, next) => {

    const { limit = 2, page = 1 } = req.query;
    const connection = await connectToDatabase();
    try {
        const result = await connection.execute(`SELECT * FROM employees limit ${limit} OFFSET ${limit*page}`);
        return res.status(200).json(
            successHandler(
                {
                    employees: result[0],
                    pagination: {
                        current_page: page,
                        total_pages: 5,
                        page_size: limit,
                        total_items: 15,
                        next_page: "/items?page=2",
                        previous_page: null
                    }
                }
                ,
                'Employee Profiles',
                200
            )
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}) // all profiles pagination filters 
// employeeRoutes.get('profile/:id', () => { }) // profile by id
// employeeRoutes.post('profile', () => { }) // new employee
// employeeRoutes.put('profile/:id', () => { }) // edit employee by id
// employeeRoutes.delete('profile/:id', () => { }) // delete employee by id


// employeeRoutes.get('roles', () => { }) // get roles
// employeeRoutes.post('role', () => { }) // new roles

// employeeRoutes.get('permissions', () => { }) // get permissions
// employeeRoutes.post('permission', () => { }) // create permissions
// employeeRoutes.post('permission/:id',()=>{}) // add permission to employee
// employeeRoutes.delete('permission/:id',()=>{}) // delete permission to employee




// employeeRoutes.get('customers', () => { })
// employeeRoutes.get('customer/:id', () => { })
// employeeRoutes.put('customer/:id', () => { })
// employeeRoutes.delete('customer/:id', () => { })



// employeeRoutes.get('agents', () => { })
// employeeRoutes.get('agent/:id', () => { })
// employeeRoutes.put('agent/:id', () => { })
// employeeRoutes.delete('agent/:id', () => { })