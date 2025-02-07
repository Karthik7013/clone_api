// =======================|        NAEMLIX 360 TOTAL INSURANCE APPLICATION        |=================>
const express = require("express");
const path = require('path')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { flushCache } = require("./utils/cache");

// ================|        MIDDLEWARES      |================>
const rateLimiter = require("./middleware/rateLimiter");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// ================|        V1 ROUTES      |================>
const authRoutes = require('./v1/routes/authRoutes')
const customerRoutes = require("./v1/routes/customerRoutes");
const agentRoutes = require("./v1/routes/agentRoutes");
const employeeRoutes = require("./v1/routes/employeeRoutes");
const botRoutes = require("./v1/routes/botRoutes");
const analyticsRoutes = require("./v1/routes/analyticsRoute");
const webhookRoutes = require("./v1/routes/webhookRoutes");

const app = express();

// middlewares
app.use(express.json());
// app.use(rateLimiter);
app.use(logger);

// ================| CORS OPTIONS |=================>
const corsOptions = {
    origin: ['http://localhost:5173'], // allowed origin
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/customer', customerRoutes)
app.use('/api/v1/agent', agentRoutes)
app.use('/api/v1/employee', employeeRoutes)
app.use('/api/v1/bot', botRoutes)
app.use('/api/v1/analytics', analyticsRoutes)
app.use('/api/v1/webhooks', webhookRoutes)

app.use(errorHandler);
app.use(notFound)
// flushCache()
// dummy


module.exports = app;