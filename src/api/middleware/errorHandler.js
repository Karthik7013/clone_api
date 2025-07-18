const dotenv = require('dotenv');
const crypto = require('crypto');
const { INSERT_ERR_LOG } = require('../config/queries.constants');
const { connectToDatabase } = require('../config/db');
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || "DEVELOPMENT"


function extractErrorDetails(stackTrace) {
  const errorDetails = {
    fileName: '',
    lineNumber: '',
    columnNumber: ''
  };

  // If the stack trace exists and contains multiple lines
  if (stackTrace && stackTrace.split('\n').length > 1) {
    const stackLine = stackTrace.split('\n')[1].trim(); // The first stack frame line

    // Regex to match (file:line:column) pattern
    const match = stackLine.match(/\((.*):(\d+):(\d+)\)$/);

    if (match) {
      errorDetails.fileName = match[1];
      errorDetails.lineNumber = match[2];
      errorDetails.columnNumber = match[3];
    }
  }

  return errorDetails;
}

const errorHandler = async (err, req, res, next) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userId = req?.auth?.loginId || null; // userId
  const method = req.method;
  const url = req.originalUrl;
  const message = err.message;
  const errType = err.toString().split(':')[0] || "";
  const severity = "Error";
  const stack = err.stack;
  const source = ""; //file name
  const errCode = err.status || 500;
  try {
    const connection = await connectToDatabase();
    await connection.execute(INSERT_ERR_LOG, [message, errType, severity, source, stack, errCode, userId, ipAddress]);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      error: {
        details: err.stack
      },
      status: err.status || 500,
      timestamp: new Date()
    });
  } catch (error) {
    next(error);
  }
};
module.exports = errorHandler;