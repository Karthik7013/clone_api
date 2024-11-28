const USER_DATA_ENCRYPTION_KEY = process.env.USER_DATA_ENCRYPTION_KEY;
const successHandler = (data, message, status) => {
    return {
        success: true,
        message,
        status: status || 200,
        data,
        timestamp: new Date()
    }
}

module.exports = successHandler;