const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: {
      stack: err.stack,
      code: err.code || "INTERNAL_SERVER_ERROR",
      details: err.details || "An unexpected error occurred.",
      timestamp: new Date().toISOString()
    },
    status: err.status || 500
  });
};
module.exports = errorHandler;