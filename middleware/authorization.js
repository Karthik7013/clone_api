const isAuthorized = (req, res, next) => {
    console.log('check permission')
    console.log('check passed');
    console.log(req.auth);
    const haspermission = true;
    if (!haspermission) {
        const err = new Error('Access-denied');
        err.status = 403;
        next(err)
    }
    next()
}
module.exports = isAuthorized;