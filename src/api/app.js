// =======================|        NAEMLIX 360 TOTAL INSURANCE APPLICATION        |=================>
const express = require("express");
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { flushCache } = require("./utils/cache");

// ================|        MIDDLEWARES      |================>
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
const smsRoutes = require("./v1/routes/smsRoutes");
const otpRoutes = require("./v1/routes/otpRoutes");
const uploadRoutes = require('./v1/routes/uploadRoutes')


const app = express();
// middlewares
app.use(express.json());
app.use(logger);

// ================| CORS OPTIONS |=================>
const corsOptions = {
    origin: ['http://localhost:5173',
        // 'https://namelixinsurance.netlify.app'
    ], // allowed origins
    // credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, '../../public')));

// ==========================| VERSION 0.1 |===========================>


app.use(`/api/v1/customer`, customerRoutes)
app.use(`/api/v1/agents`, agentRoutes)
app.use(`/api/v1/employees`, employeeRoutes)

app.use('/api/v1/analytics', analyticsRoutes)

// resources
app.use('/api/v1/upload', uploadRoutes)
app.use('/api/v1/bot', botRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/api/v1/auth', authRoutes)


app.get('/setCookie', (req, res) => {
    res.cookie('mycookie', '1234', {
        httpOnly: process.env.NODE_ENV === 'PRODUCTION',
        // maxAge:'',
        // expires:'',
        // secure:true,
        // domain:'',
    })
    return res.status(200).json({
        message: "set cookie",
        cookie: "Cookie"
    })
})


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