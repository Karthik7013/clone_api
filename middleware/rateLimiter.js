const rateLimit = require("express-rate-limit");
// rate = 30req/min
const limiter = rateLimit({
  windowMs: 60 * 1000, // time in ms
  max: 30, // request
  message: {
    success: false,
    data: null,
    message: "Too many requests from this IP, please try again later.",
    statusCode: 429,
    v: 0.1,
  },
});
module.exports = limiter;
