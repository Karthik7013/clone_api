// =======================|        NAEMLIX 360 TOTAL INSURANCE APPLICATION        |=================>
const express = require("express");
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { flushCache } = require("./utils/cache");

// ================|        MIDDLEWARES      |================>
const rateLimiter = require("./middleware/rateLimiter");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// ================|        V1 ROUTES      |================>
const authRoutes = require('./v1/routes/authRoutes');
const customerRoutes = require("./v1/routes/customerRoutes");
const agentRoutes = require("./v1/routes/agentRoutes");
const employeeRoutes = require("./v1/routes/employeeRoutes");
const botRoutes = require("./v1/routes/botRoutes");
const analyticsRoutes = require("./v1/routes/analyticsRoute");
const webhookRoutes = require("./v1/routes/webhookRoutes");
const smsRoutes = require("./v1/routes/smsRoutes");

// ================|        V1 ROUTES      |================>
const authRoutesV2 = require('./v2/routes/authRoutes');
const customerRoutesV2 = require("./v2/routes/customerRoutes");
const agentRoutesV2 = require("./v2/routes/agentRoutes");
const employeeRoutesV2 = require("./v2/routes/employeeRoutes");
const botRoutesV2 = require("./v2/routes/botRoutes");
const analyticsRoutesV2 = require("./v2/routes/analyticsRoute");
const webhookRoutesV2 = require("./v2/routes/webhookRoutes");
const smsRoutesV2 = require("./v2/routes/smsRoutes");
const successHandler = require("./middleware/successHandler");
const connectToDatabase = require("./config/db");

const app = express();

// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(logger);

// ================| CORS OPTIONS |=================>
const corsOptions = {
    origin: ['http://localhost:5173'], // allowed origins
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, '../../public')));

// ==========================| VERSION 0.1 |===========================>

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/customer', customerRoutes)
app.use('/api/v1/agent', agentRoutes)
app.use('/api/v1/employee', employeeRoutes)
app.use('/api/v1/bot', botRoutes)
app.use('/api/v1/analytics', analyticsRoutes)
app.use('/api/v1/webhooks', webhookRoutes)
app.use('/api/v1/sms', smsRoutes)

// SSE
app.get('/event', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive');
    const randInt = () => {
        return Math.floor(Math.random() * 100)
    }

    const interval = setInterval(() => {
        const dataMap = [
            {
                name: 'Sales',
                data: new Array(7).fill(0).map(() => randInt()),
            }
        ]
        console.log('triggerd!')

        res.write(`data: ${JSON.stringify(dataMap)}\n\n`);
    }, 1000)

    req.on('close', () => {
        console.log('event aborted !')
        clearInterval(interval);
        res.end()
    })
})

app.use(errorHandler);
app.use(notFound);
// flushCache()

module.exports = app;