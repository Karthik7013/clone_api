// NAEMLIX 360 INSURANCE APPLICATION
//
const express = require("express");
const rateLimiter = require("./middleware/rateLimiter");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const dashboardRoutes = require("./route/v1/dashboard/dashboardRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(logger);
app.use(errorHandler);


app.use("/api/v1", dashboardRoutes);

app.listen(PORT, () =>
  console.log(
    ` -----------------------------\n| server running on port ${PORT} |\n -----------------------------`
  )
);
