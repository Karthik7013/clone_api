const { Router } = require('express');
const { getCustomerPolicies, registerClaim, getCustomerClaims, getPolicyPayments, createPolicy, updatePaymentDetails } = require('../../../controller/customerController');
const isAuthenticated = require('../../../middleware/auth');

const customerRoutes = Router();
customerRoutes.post('/createPolicy', isAuthenticated(['customer']), createPolicy)
customerRoutes.get('/policies', isAuthenticated(['customer']), getCustomerPolicies)
customerRoutes.get('/claims', isAuthenticated(['customer']), getCustomerClaims)
customerRoutes.post('/register-claims', isAuthenticated(['customer']), registerClaim)
customerRoutes.get('/payments', isAuthenticated(['customer']), getPolicyPayments)
customerRoutes.patch('/paymentDetails', isAuthenticated(['customer']), updatePaymentDetails)

module.exports = customerRoutes;

// select * from policies left join registered_claims on policies.policy_id = registered_claims.policy_id where customer_id = 'C001';  // get register claim for a particular customer_id

