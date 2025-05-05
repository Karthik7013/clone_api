const rateLimit = require("express-rate-limit");
// rate = 30req/min
const limiter = (windowMs = 60 * 1000, max = 1) => {
  return rateLimit({
    windowMs, // time in ms
    max, // request
    message: {
      success: false,
      message: `Too many requests from this IP, please try again after ${windowMs} ms.`,
      status: 429,
      timestamp: new Date()
    },
  });
}
module.exports = limiter;