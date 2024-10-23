// NAEMLIX 360 INSURANCE APPLICATION
//
const express = require("express");
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

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(logger);
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors());
app.use(cookieParser())


app.listen(PORT, () =>
  console.log(` -----------------------------\n| server running on port ${PORT} |\n -----------------------------`)
);

app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/", smsRoutes);



app.use('/api/v1/auth', authRoutes)


app.use(errorHandler);

app.use(notFound)


// this is development branch