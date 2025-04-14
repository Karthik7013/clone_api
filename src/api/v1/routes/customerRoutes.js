const { Router } = require('express');
const { getCustomerPolicies, registerClaim, getCustomerClaims, getPolicyPayments, createPolicy, updatePaymentDetails, getCustomerProfile, getCustomerStats, getCustomerPolicyQueues, updateCustomerProfile } = require('../controller/customerController');
const isAuthenticated = require('../../middleware/auth');
const { createCustomer } = require('../controller/authController');

const customerRoutes = Router();
customerRoutes.get('/profile', isAuthenticated(['customer']), getCustomerProfile)
customerRoutes.post('/profile/update', isAuthenticated(['customer']), updateCustomerProfile)
customerRoutes.post('/createPolicy', isAuthenticated(['customer']), createPolicy)
customerRoutes.get('/policies', isAuthenticated(['customer']), getCustomerPolicies)

customerRoutes.get('/claims', isAuthenticated(['customer']), getCustomerClaims)
customerRoutes.post('/register-claims', isAuthenticated(['customer']), registerClaim)

customerRoutes.get('/payments', isAuthenticated(['customer']), getPolicyPayments)
customerRoutes.patch('/paymentDetails', isAuthenticated(['customer']), updatePaymentDetails)
customerRoutes.get('/analytics', isAuthenticated(['customer']), getCustomerStats)
customerRoutes.get('/policyQueue', isAuthenticated(['customer']), getCustomerPolicyQueues)

// modified

customerRoutes.get("")

/**
 * 
 * customers/   -> pagination required !
 * / -> pagination required limit, page
 * /:id [GET]
 * /:id [post]
 * /:id [delete]
 * 
 * 
 * 
 * /claims -> pagination required
 * /:id [GET]
 * 
 * /:id/stats [GET]
 * 
 * 
 * 
 */

module.exports = customerRoutes;