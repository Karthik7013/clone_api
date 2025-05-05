const rateLimit = require("express-rate-limit");

/**
 * Creates an Express rate-limiting middleware with configurable time window and request limit.
 *
 * @param {number} [windowMs=60000] - The duration of the rate limit window in milliseconds (default is 60,000 ms = 1 minute).
 * @param {number} [max=10] - Maximum number of requests allowed per IP within the window (default is 1).
 * @returns {import("express").RequestHandler} Express middleware function to enforce rate limiting.
 *
 * @example
 * const rateLimiter = limiter(5 * 60 * 1000, 1); // Allow 1 request every 5 minutes
 * 
 */

const limiter = (windowMs = 60 * 1000, max = 10) => {
  return rateLimit({
    windowMs, // time in ms
    max, // request
    message: {
      success: false,
      message: `Too many requests, please try again after ${windowMs} ms.`,
      status: 429,
      timestamp: new Date()
    },
  });
}
module.exports = limiter;