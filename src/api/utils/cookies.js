const setCookie = (res, key, value, options) => {
    res.cookie(key, value, {
        httpOnly: true,       // Cannot be accessed by JS in frontend (more secure)
        secure: process.env.NODE_ENV === 'PRODUCTION',
        ...options
    });
}


const getCookie = (req, key) => {
    return req.cookies[key];
}
const clearCookie = (res, key, options = {}) => {
    res.clearCookie(key, {
        httpOnly: true,       // Cannot be accessed by JS in frontend (more secure)
        secure: process.env.NODE_ENV === 'PRODUCTION',
        ...options
    });
}

module.exports = {
    setCookie,
    getCookie,
    clearCookie
}