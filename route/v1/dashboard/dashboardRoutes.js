const { Router } = require("express");
const isAuthenticated = require("../../../middleware/auth");
const { verifyCustomerNumber, getCustomerProfile } = require("../../../controller/dashboardController");
const dashboardRoutes = Router();



// customer-routes
dashboardRoutes.post('/customer/verify', verifyCustomerNumber)
dashboardRoutes.post('/customer/profile', isAuthenticated, getCustomerProfile)

module.exports = dashboardRoutes;
