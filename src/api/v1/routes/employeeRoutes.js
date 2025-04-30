const { Router } = require('express');
const isAuthenticated = require('../../middleware/auth');
const { getEmployeeProfile, getAgentProfiles, getEmployeeProfiles, getCustomerProfiles, getClaims, createEmployee, createPermission, createRole, getRoles, getPermissions, addPermissions, removePermissions, deleteEmployee, editEmployee, getEmployeePermissions } = require('../controller/employeeController');
const isAuthorized = require('../../middleware/authorization');
const { connectToDatabase } = require('../../config/db');
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
employeeRoutes.post('/create-role', isAuthenticated(['employee']), createRole);
employeeRoutes.post('/create-permission', isAuthenticated(['employee']), createPermission);
employeeRoutes.post('/attach-permissions', isAuthenticated(['employee']), addPermissions);
employeeRoutes.post('/remove-permissions', isAuthenticated(['employee']), removePermissions);
employeeRoutes.get('/employee-permissions', isAuthenticated(['employee']), getEmployeePermissions);
employeeRoutes.post('/errorlog', async (req, res) => {
    const today = new Date();
    const defaultToDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`; // 
    today.setDate(today.getDate() - 10);
    const defaultFromDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const { fromDate = defaultFromDate, toDate = defaultToDate, limit = 10, page = 1 } = req.body;
    const connection = await connectToDatabase();
    const response = await connection.execute(`SELECT ErrorID,ErrorMessage,ErrorType,Severity,ErrorSource,StackTrace,ErrorCode,UserID,IPAddress,Timestamp from ErrorLog WHERE Timestamp BETWEEN '${fromDate}' AND '${toDate}'  LIMIT ${limit} OFFSET ${(page - 1) * limit}`);
    return res.status(200).json(successHandler(response[0], 'Error Logs', 200));
});


module.exports = employeeRoutes;

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
employeeRoutes.post('permission/:id', () => { }) // add permission to employee by empid
employeeRoutes.delete('permission/:id', () => { }) // delete permission to employee by empid



employeeRoutes.get('customers', () => { })
employeeRoutes.get('customer/:id', () => { })
employeeRoutes.put('customer/:id', () => { })
employeeRoutes.delete('customer/:id', () => { })



employeeRoutes.get('agents', () => { })
employeeRoutes.get('agent/:id', () => { })
employeeRoutes.put('agent/:id', () => { })
employeeRoutes.delete('agent/:id', () => { })