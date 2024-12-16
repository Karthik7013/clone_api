const { Router } = require('express');
const isAuthenticated = require('../../../middleware/auth');
const { getAgentProfile } = require('../../../controller/agentController');


const agentRoutes = Router();
agentRoutes.get('/profile', isAuthenticated(['agent']), getAgentProfile);
agentRoutes.post('/profile/update', isAuthenticated(['agent']), () => { });
agentRoutes.post('/createPolicy', isAuthenticated(['agent']), () => { })
agentRoutes.get('/policies', isAuthenticated(['agent']), () => { })
agentRoutes.get('/claims', isAuthenticated(['agent']), () => { })
agentRoutes.post('/register-claims', isAuthenticated(['agent']), () => { })


module.exports = agentRoutes;