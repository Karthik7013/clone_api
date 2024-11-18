// NAEMLIX 360 INSURANCE APPLICATION
//
const express = require("express");
const path = require('path')
const rateLimiter = require("./middleware/rateLimiter");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const dashboardRoutes = require("./route/v1/dashboard/dashboardRoutes");
const smsRoutes = require("./route/v1/dashboard/smsRoutes");
const authRoutes = require('./route/v1/auth/authRoutes')
const cors = require("cors");
const mysql = require('mysql2');
const cookieParser = require("cookie-parser");
const notFound = require("./middleware/notFound");
const customerRoutes = require("./route/v1/customer/customerRoutes");
const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(logger);
const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: 'http://localhost:5173', // Change to your frontend URL
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser())



app.listen(PORT, () =>
  console.log(` -----------------------------\n| server running on port ${PORT} |\n -----------------------------`)
);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/api/v1/dashboard", dashboardRoutes);
// app.use("/api/v1/", smsRoutes);



app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/customer', customerRoutes)


app.use(errorHandler);
app.use(notFound)