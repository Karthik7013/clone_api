const { Router } = require("express");
const isAuthenticated = require("../../../middleware/auth");
const { verifyCustomerNumber, getCustomerProfile, getPospProfile } = require("../../../controller/dashboardController");
const dashboardRoutes = Router();



// customer-routes
dashboardRoutes.post('/customer/verify', verifyCustomerNumber)
dashboardRoutes.post('/customer/profile', isAuthenticated, getCustomerProfile)

// posp-routes
dashboardRoutes.post('/posp/verify', verifyCustomerNumber)
dashboardRoutes.post('/posp/profile', isAuthenticated, getPospProfile)

module.exports = dashboardRoutes;
