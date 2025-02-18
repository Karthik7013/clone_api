const { Router } = require('express');
const { getCustomerPolicies, registerClaim, getCustomerClaims, getPolicyPayments, createPolicy, updatePaymentDetails, getCustomerProfile, getCustomerStats, getCustomerPolicyQueues, updateCustomerProfile } = require('../controller/customerController');
const isAuthenticated = require('../../middleware/auth');
const { customerProfileHandler, customerApplicationHandler, customerPolicyHandler, customerPaymentHandler, customerClaimsHandler } = require('../handler/customerHandler');
const customerRoutes = Router();

customerRoutes.get('/profile/:id', isAuthenticated(['customer']), customerProfileHandler)
customerRoutes.post('/profile', customerProfileHandler) // add customer profile
customerRoutes.put('/profile/:id', customerProfileHandler) // update customer profile
customerRoutes.delete('/profile/:id', customerProfileHandler) // delete customer profile by id

customerRoutes.get('/application/:id', customerApplicationHandler) //get customer application by id
customerRoutes.get('/applications', customerApplicationHandler) // get customer applications pagination is required
customerRoutes.post('/application', customerApplicationHandler) // post customer application
customerRoutes.delete('/application/:id', customerApplicationHandler) // post customer application

customerRoutes.post('/register', (req, res) => { return res.send('') }) // get customer policy by policy id

customerRoutes.get('/policies', customerPolicyHandler) // get cutomer policies pagination required !
customerRoutes.get('/policy/:id', customerPolicyHandler) // get customer policy by policy id

customerRoutes.get('/calims', customerClaimsHandler) // get claims pagination is required
customerRoutes.get('/claim/:id', customerClaimsHandler) // get customer claim by claim id

customerRoutes.get('/payment/:id', customerPaymentHandler) // get customer payment by id
customerRoutes.get('/payments', customerPaymentHandler) // get customer payments pagination is required

customerRoutes.get('/preference/:id', (req, res) => { return res.send('') }) // customer notification preference 
customerRoutes.post('/preference/:id', (req, res) => { return res.send('') }) // add notification preference
customerRoutes.put('/preference/:id', (req, res) => { return res.send('') }) // update notification preference

module.exports = customerRoutes;