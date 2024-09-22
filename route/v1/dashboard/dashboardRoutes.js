const { Router } = require("express");
const isAuthenticated = require("../../../middleware/auth");
const { verifyCustomerNumber, getCustomerProfile, getPospProfile, verifyPospNumber, verifyEmployeeNumber, getEmployeeProfile, getCustomerStats, getCustomerPolicies, getCutomerClaims } = require("../../../controller/dashboardController");
const dashboardRoutes = Router();



// customer-routes
dashboardRoutes.post('/customer/verify', verifyCustomerNumber)
dashboardRoutes.post('/customer/profile', isAuthenticated, getCustomerProfile)
dashboardRoutes.get('/customer/stats', isAuthenticated, getCustomerStats)
dashboardRoutes.get('/customer/policies', isAuthenticated, getCustomerPolicies)
dashboardRoutes.get('/customer/claims', isAuthenticated, getCutomerClaims)

// posp-routes
dashboardRoutes.post('/verify', verifyPospNumber)
dashboardRoutes.post('/profile', isAuthenticated, getPospProfile)


// employee-routes
dashboardRoutes.post('/employee/verify', verifyEmployeeNumber)
dashboardRoutes.post('/employee/profile', isAuthenticated, getEmployeeProfile)

module.exports = dashboardRoutes;
