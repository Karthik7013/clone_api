const { Router } = require('express');
const analyticsRoutes = Router();

analyticsRoutes.get('/cron-job', (req,res) => {
    console.log('cron-job triggered !')
    return res.send('cron-job-triggered !');
})

module.exports = analyticsRoutes;