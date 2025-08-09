// =======================|        NAEMLIX 360 TOTAL INSURANCE APPLICATION        |=================>
const express = require("express");
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const { flushCache } = require("./utils/cache");
const favicon = require('serve-favicon');

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
const uploadRoutes = require('./v1/routes/uploadRoutes');
const mediaRoutes = require('./v1/routes/mediaRoutes')
const { sendTeligramMessage } = require('../../src/api/v1/handlers/teligramMessageHandler');

const app = express();
// middlewares
app.use(express.json());
app.use(logger);

// ================| CORS OPTIONS |=================>
const corsOptions = {
    origin: [
        'https://namelixinsurance.netlify.app'
    ], // allowed origins
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../../public/favicon.png')));
app.use('/public', express.static(path.join(__dirname, '../../public')));

// ==========================| VERSION 0.1 |===========================>


app.use(`/api/v1/customer`, customerRoutes)
app.use(`/api/v1/agents`, agentRoutes)
app.use(`/api/v1/employees`, employeeRoutes)

app.use('/api/v1/analytics', analyticsRoutes)

// resources
app.use('/api/v1/upload', uploadRoutes)
app.use('/api/v1/media', mediaRoutes)
app.use('/api/v1/bot', botRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/api/v1/auth', authRoutes)

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

        res.write(`data: ${JSON.stringify(dataMap)}\n\n`);
    }, 1000)

    req.on('close', () => {
        clearInterval(interval);
        res.end()
    })
})

app.post('/dummy', async (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Cache-Control', 'no-cache');

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        res.write('Processing started...\n');

        for (let i = 1; i <= 5; i++) {
            await delay(2000); // Wait 1 sec
            res.write(`Chunk ${i}\n`);
            res.flushHeaders()
            console.log(`Sent: Chunk ${i}`);
        }
        res.end('All done.\n');
    } catch (error) {
        next(error);
    }
});

app.post('/teligram/bot/message', async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message, "finalmessage")
        const response = sendTeligramMessage(message);
        return res.status(200).json({
            message: "Message sent successfully"
        })
    } catch (error) {
        next(error);
    }
})



app.use(errorHandler);
app.use(notFound);
// flushCache()

module.exports = app;