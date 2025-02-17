const { Router } = require('express');
const isAuthenticated = require('../../middleware/auth');
const { getAgentProfile, getAgentCustomers, getAgentPolicies, createAgentCustomer } = require('../controller/agentController');


const agentRoutes = Router();

// ======== proper routing for agent =========>


agentRoutes.get('/profile/:id', ()=>{});
agentRoutes.post('/profile', ()=>{});
agentRoutes.put('/profile/:id', ()=>{});
agentRoutes.delete('/profile/:id', ()=>{});

agentRoutes.post('/policy', ()=>{});  // add offline policy

agentRoutes.get('/claims', ()=>{});    // pagination claims
agentRoutes.get('/claim/:id', ()=>{});    // pagination claims

agentRoutes.delete('/profile/:id', ()=>{});
agentRoutes.delete('/profile/:id', ()=>{});


module.exports = agentRoutes;