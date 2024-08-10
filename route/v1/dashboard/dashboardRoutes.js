const { Router } = require("express");
const isAuthenticated = require("../../../middleware/auth");
const { getProfile } = require("../../../controller/dashboardController");

const dashboardRoutes = Router();

dashboardRoutes.get("/dashboard/profile", isAuthenticated, getProfile);

module.exports = dashboardRoutes;
