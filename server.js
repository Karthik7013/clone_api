// NAEMLIX 360 INSURANCE APPLICATION
//
const express = require("express");
const path = require('path')
const rateLimiter = require("./middleware/rateLimiter");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require('./route/v1/auth/authRoutes')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const notFound = require("./middleware/notFound");
const customerRoutes = require("./route/v1/customer/customerRoutes");
const agentRoutes = require("./route/v1/agent/agentRoutes");
const employeeRoutes = require("./route/v1/employee/employeeRoutes");
const botRoutes = require("./route/v1/bot/botRoutes");
const { flushCache } = require("./utils/cache");
const app = express();
const PORT = process.env.PORT || 8000;
const { v4: uuid } = require('uuid');
const analyticsRoutes = require("./route/v1/analytics/analyticsRoute");
const webhookRoutes = require("./route/v1/webhooks/webhookRoutes");
// middlewares
app.use(express.json());
console.log(uuid().split('-')[0])
// app.use(rateLimiter);
app.use(logger);
const corsOptions = {
  origin: ['http://localhost:5173'], // Change to your frontend URL
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.listen(PORT, () =>
  console.log(` -----------------------------\n| server running on port ${PORT} |\n -----------------------------`)
);

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