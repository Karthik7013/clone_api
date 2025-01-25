const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: {
      stack: err.stack,
      details: err.details || "An unexpected error occurred."
    },
    status: err.status || 500,
    timestamp: new Date()
  });
};
module.exports = errorHandler;