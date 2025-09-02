const { Router } = require("express");
const successHandler = require("../../middleware/successHandler");
const { setCookie, getCookie, clearCookie } = require("../../utils/cookies");
const { sendOtp2Email, verifyOtp } = require("../handlers/otpHandler");
const rateLimiter = require("../../middleware/rateLimiter");
const otpRoutes = Router();

// 1 request per 2 min (can send otp via email 1req/min)
otpRoutes.post('/send', rateLimiter(2 * 60 * 1000, 1), async (req, res, next) => {
  try {
    const { identity } = req.body
    if (!identity) {
      const err = new Error('Identity is required !')
      next(err)
    }
    switch (identity) {
      case 'email':
        const email = req.body.email;
        const name = req.body.name;
        const response = await sendOtp2Email(email, name);
        setCookie(res, 'otpSessionId', response.messageId, {
          maxAge: 2 * 60 * 1000  // 2 minutes
        })
        return res.status(200).json(successHandler(response, 'OTP sent successfully', 200))
      default:
        const notImplemented = new Error("Not Implemented")
        next(notImplemented);
    }
  } catch (error) {
    next(error);
  }
})

// 10 request per min (can verify 10req/min)
otpRoutes.post('/verify', rateLimiter(1 * 60 * 1000, 10), async (req, res, next) => {
  const { redirect } = req.query;
  try {
    const key = "otpSessionId";
    const messageId = getCookie(req, key);
    const { otp } = req.body;
    const response = await verifyOtp(otp, messageId);
    clearCookie(res, key);
    if (redirect) {
      return res.redirect(redirect);
    }
    return res.status(200).json(successHandler(response, 'OTP verified successfully', 200))
  } catch (error) {
    next(error);
  }
})

module.exports = otpRoutes;