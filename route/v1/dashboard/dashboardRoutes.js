const { Router } = require("express");
const isAuthenticated = require("../../../middleware/auth");
const { verifyCustomerNumber, getCustomerProfile, getPospProfile, verifyPospNumber, verifyEmployeeNumber, getEmployeeProfile } = require("../../../controller/dashboardController");
const dashboardRoutes = Router();



// customer-routes
dashboardRoutes.post('/customer/verify', verifyCustomerNumber)
dashboardRoutes.post('/customer/profile', isAuthenticated, getCustomerProfile)

// posp-routes
dashboardRoutes.post('/posp/verify', verifyPospNumber)
dashboardRoutes.post('/posp/profile', isAuthenticated, getPospProfile)


// employee-routes
dashboardRoutes.post('/employee/verify', verifyEmployeeNumber)
dashboardRoutes.post('/employee/profile', isAuthenticated, getEmployeeProfile)

module.exports = dashboardRoutes;
