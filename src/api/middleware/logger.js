const { sendTeligramMessage } = require("../v1/handlers/teligramMessageHandler");

const reqLogger = async (req, res, next) => {
    const currentTime = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    await sendTeligramMessage(`
\`\`\`json
{
    "currentTime": "${currentTime}",
    "method": "${method}",
    "url": "${url}"
}
\`\`\``
    );
    console.log(`[${currentTime}]${method} request to ${url}`);
    next();
};

module.exports = reqLogger;