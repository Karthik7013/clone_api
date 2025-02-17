const { Router } = require('express');
const isAuthenticated = require('../../middleware/auth');
const { getEmployeeProfile, getAgentProfiles, getEmployeeProfiles, getCustomerProfiles, getClaims, createEmployee, createPermission, createRole, getRoles, getPermissions, addPermissions, removePermissions, deleteEmployee, editEmployee, getEmployeePermissions } = require('../controller/employeeController');
const isAuthorized = require('../../middleware/authorization');
const connectToDatabase = require('../../config/db');
const successHandler = require('../../middleware/successHandler');

const employeeRoutes = Router();



// ============= correct routing system ==============>
employeeRoutes.get('/profiles', async (req, res, next) => {
    const { limit = 2, page = 1 } = req.query;
    const connection = await connectToDatabase();
    try {
        // Get the total count of employees to calculate pagination
        const totalItemsResult = await connection.execute('SELECT COUNT(*) AS total FROM employees');
        const totalItems = totalItemsResult[0][0].total;

        // Calculate total pages dynamically
        const totalPages = Math.ceil(totalItems / limit);

        // Fetch employees for the current page
        const result = await connection.execute(`SELECT * FROM employees LIMIT ${limit} OFFSET ${limit * page}`);

        // Generate the pagination info
        const pagination = {
            current_page: page,
            total_pages: totalPages,
            page_size: limit,
            total_items: totalItems,
            next_page: page < totalPages - 1 ? page + 1 : null,
            previous_page: page > 0 ? page - 1 : null
        };

        // Send the response with dynamic pagination
        return res.status(200).json(
            successHandler(
                {
                    employees: result[0],
                    pagination: pagination
                },
                'Employee Profiles',
                200
            )
        );
    } catch (error) {
        next(error);
    } finally {
        await connection.end();
    }

})
employeeRoutes.get('profile/:id', () => { }) // profile by id
employeeRoutes.post('profile', () => { }) // new employee
employeeRoutes.put('profile/:id', () => { }) // edit employee by id
employeeRoutes.delete('profile/:id', () => { }) // delete employee by id


employeeRoutes.get('roles', () => { }) // get roles
employeeRoutes.post('role', () => { }) // new roles

employeeRoutes.get('permissions', () => { }) // get permissions
employeeRoutes.post('permission', () => { }) // create permissions
employeeRoutes.post('permission/:id',()=>{}) // add permission to employee by empid
employeeRoutes.delete('permission/:id',()=>{}) // delete permission to employee by empid



employeeRoutes.get('customers', () => { })
employeeRoutes.get('customer/:id', () => { })
employeeRoutes.put('customer/:id', () => { })
employeeRoutes.delete('customer/:id', () => { })

    

employeeRoutes.get('agents', () => { })
employeeRoutes.get('agent/:id', () => { })
employeeRoutes.put('agent/:id', () => { })  
employeeRoutes.delete('agent/:id', () => { })

module.exports = employeeRoutes;