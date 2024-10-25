const reqLogger = (req, res, next) => {
    const currentTime = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    console.log(`[${currentTime}] ${method} request to ${url}`);
    next();
};

module.exports = reqLogger;