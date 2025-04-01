const { Router } = require('express');
const analyticsRoutes = Router();
const puppeteer = require('puppeteer');




analyticsRoutes.get('/cron-job', async (req, res) => {
    const browser = await puppeteer.launch({ headless: false }); // Set to true for background
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // 1. Open login page
    await page.goto('https://www.naukri.com/nlogin/login', { waitUntil: 'networkidle2' });

    // 2. Login
    await page.type('#usernameField', process.env.NAUKRI_EMAIL, { delay: 50 });
    await page.type('#passwordField', process.env.NAUKRI_PASSWORD, { delay: 50 });

    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);
    // 3. Navigate to profile page
    await page.goto('https://www.naukri.com/mnjuser/profile', { waitUntil: 'networkidle2' });

    await page.click('.hdn> em');
    await page.click('#saveBasicDetailsBtn');

    // 4. Wait to ensure the page registers the refresh
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('/============== NAUKRI PROFILE REFRESHED ==================/')
    await browser.close();
    return res.send('[cron-job] - Naukri Profile Updated');
})

module.exports = analyticsRoutes;