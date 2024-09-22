const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: err.stack,
    status: err.status || 500
  });
};
module.exports = errorHandler;
