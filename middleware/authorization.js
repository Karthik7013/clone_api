const isAuthorized = (permission)=>{
    return  (req, res, next) => {
            console.log('check permission');
            console.log('check passed');
            console.log(req.auth.loginId); // employeeID check employee has permission perform the task !
            // db => []
                const per = []
            const hasPermission = [].includes(permission);
            if (hasPermission) {
                const err = new Error('Access-denied');
                err.status = 403;
                next(err)
            }
            next()
        }
}

module.exports = isAuthorized;