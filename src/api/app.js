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
const { getIP } = require("../../tor");
const limiter = require("./middleware/rateLimiter");
const { streamContent } = require("./v1/service/gemini");
const { handleTargetRequest } = require("./v1/routes/target");

const app = express();
// middlewares
app.use(express.json());
app.use(logger);

// ================| CORS OPTIONS |=================>
const corsOptions = {
    origin: [
        'https://cipherbot.netlify.app',
        'http://localhost:5173'
    ], // allowed origins
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../../public/favicon.png')));
app.use('/public', express.static(path.join(__dirname, '../../public')));

// ==========================| VERSION 0.1 |===========================>



// resources
app.use('/api/v1/upload', uploadRoutes)
app.use('/api/v1/media', mediaRoutes)
app.use('/api/v1/bot', botRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/api/v1/auth', authRoutes)

// SSE
app.get('/api/v1/event', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        res.end();
    }
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    streamContent(res, query);
})


app.post('/api/v1/ask', (req, res, next) => {
    try {
        const { t } = req.body;
        const uuid = 1;
        // set the queryid:query(t) -> set in redis
        // return the queryid

    } catch (error) {
        next(error)
    }
})



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

app.get('/private', async (req, res, next) => {
    try {
        const ip = await getIP(req.query);
        return res.send(
            ip
        )
    } catch (error) {
        console.log(error.message);
    }
})

app.post('/target', handleTargetRequest);


app.use(errorHandler);
app.use(notFound);
// flushCache()

module.exports = app;
