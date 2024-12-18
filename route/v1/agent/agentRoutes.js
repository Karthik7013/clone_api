const { Router } = require('express');
const isAuthenticated = require('../../../middleware/auth');
const { getAgentProfile, getAgentCustomers, getAgentPolicies, createAgentCustomer } = require('../../../controller/agentController');


const agentRoutes = Router();
agentRoutes.get('/profile', isAuthenticated(['agent']), getAgentProfile);
agentRoutes.get('/mycustomers',isAuthenticated(['agent']),getAgentCustomers)
agentRoutes.get('/policies', isAuthenticated(['agent']),getAgentPolicies)
agentRoutes.get('/createcustomer',isAuthenticated(['agent']), createAgentCustomer)


agentRoutes.post('/profile/update', isAuthenticated(['agent']), () => { });
agentRoutes.post('/createPolicy', isAuthenticated(['agent']), () => { })
agentRoutes.get('/claims', isAuthenticated(['agent']), () => { })
agentRoutes.post('/register-claims', isAuthenticated(['agent']), () => { })

module.exports = agentRoutes;