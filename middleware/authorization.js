const connectToDatabase = require("../db/db");
const { GET_EMPLOYEE_ID } = require("../db/queries/queries.constants");
const { getCache, generateCacheKey, setCache } = require("../utils/cache");
const successHandler = require("./successHandler");

const isAuthorized = (permission) => {
    return async (req, res, next) => {
        const connection = await connectToDatabase();
        const employee_id = req.auth.loginId;
        try {
            let hasPermission = false;
            const cacheResponse = await getCache(`employee:${employee_id}:profile`);
            if (cacheResponse) {
                hasPermission = cacheResponse.data.permissions.includes(permission)
            }

            if (!hasPermission) {
                const response = await connection.execute(GET_EMPLOYEE_ID, [employee_id]);
                if (response[0].length === 0) {
                    const err = new Error('Employee not found');
                    err.status = 404;
                    return next(err);
                }
                // cache the data
                const cacheKey = generateCacheKey('employee', `${employee_id}`, 'profile');
                await setCache(cacheKey,
                    successHandler(
                        {
                            ...response[0][0],
                            role: 'employee',
                        },
                        "Employee found.",
                        200,
                    )
                )
                hasPermission = response[0][0].permissions.includes(permission);
            }

            if (!hasPermission) {
                const err = new Error('Access-denied');
                err.status = 403;
                return next(err)
            }
            next()
        } catch (error) {
            next(error)
        } finally {
            await connection.end();
        }
    }
}

module.exports = isAuthorized;