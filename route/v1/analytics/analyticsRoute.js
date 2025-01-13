const { Router } = require('express');
const analyticsRoutes = Router();

analyticsRoutes.get('/cron-job', () => {
    console.log('cron-job triggered !')
})

module.exports = analyticsRoutes;