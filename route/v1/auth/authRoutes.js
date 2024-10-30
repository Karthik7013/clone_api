const { Router } = require('express');
const isAuthenticated = require('../../../middleware/auth')
const { verfiyAgent,
    verfiyCustomer,
    verfiyEmployee,
    createCustomer,
    createAgent,
    createEmployee,
    getCustomerProfile,
    getAgentProfile,
    getEmployeeProfile,
    getAccessToken,
    signOut
} = require('../../../controller/authController');

const authRoutes = Router();


authRoutes.post('/signup/customer', createCustomer)
authRoutes.post('/signup/agent', createAgent)
authRoutes.post('/signup/employee', createEmployee)

authRoutes.post('/customer/verify', verfiyCustomer)
authRoutes.post('/agent/verify', verfiyAgent)
authRoutes.post('/employee/verify', verfiyEmployee)

authRoutes.post('/customer/signOut', signOut)
authRoutes.post('/agent/signOut', signOut)
authRoutes.post('/employee/signOut', signOut)


authRoutes.get('/customer/profile', isAuthenticated(['customer']), getCustomerProfile);
authRoutes.get('/agent/profile', isAuthenticated(['agent']), getAgentProfile);
authRoutes.get('/employee/profile', isAuthenticated(['employee']), getEmployeeProfile);

authRoutes.get('/employee/routes', isAuthenticated(['employee']), (req, res, next) => {
    res.send([
        {
            label: "Analytics",
            path: "analytics",
            icon: "trending_up",
        },
        {
            label: "Revenue",
            path: "revenue",
            icon: "payments",
        },
        {
            label: "Sales",
            path: "sales",
            icon: "sell",
        },
        {
            label: "Income",
            path: "income",
            icon: "currency_rupee_circle",
        },
        {
            label: "Service",
            path: "service",
            icon: "support_agent",
        },

        {
            label: "Employee Management",
            path: "employee-management",
            icon: "supervisor_account",
        },
        {
            label: "Agent Management",
            path: "agent-management",
            icon: "supervisor_account",
        },
        {
            label: "Products",
            path: "products",
            icon: "category",
        },
        {
            label: "Access",
            path: "access-management",
            icon: "checklist_rtl",
        },
        {
            label: "Settings",
            path: "settings",
            icon: "settings",
        },
    ])
})

authRoutes.post('/generate-access-token', getAccessToken)

module.exports = authRoutes;