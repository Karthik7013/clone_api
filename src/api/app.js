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

const otpRoutes = require("./v1/routes/otpRoutes");
const uploadRoutes = require('./v1/routes/uploadRoutes');
const { sendTeligramMessage } = require('../../src/api/v1/handlers/teligramMessageHandler');
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
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/otp', otpRoutes);

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

// tools
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


app.get('/target', handleTargetRequest);

app.use(errorHandler);
app.use(notFound);
// flushCache()

module.exports = app;