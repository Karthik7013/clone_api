function customerAuthorized(req, res, next) {
    if (!(req.params.id === req.auth.loginId)) {
        const err = new Error('Access Denied for this login');
        return next(err);
    }
    next()
};

module.exports = { customerAuthorized };