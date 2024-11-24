const { Router } = require('express');
const isAuthenticated = require('../../../middleware/auth');
const { getAgentProfile } = require('../../../controller/agentController');


const agentRoutes = Router();
agentRoutes.get('/profile', isAuthenticated(['agent']), getAgentProfile)


module.exports = agentRoutes;