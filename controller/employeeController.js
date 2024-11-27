

// @desc     get customer policies
// @route    /profile

const connectToDatabase = require("../db/db");
const { GET_EMPLOYEE_ID } = require("../db/queries/queries.constants");

// @access   private
const getEmployeeProfile = async (req, res, next) => {
    const connection = await connectToDatabase();
    const employee_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_EMPLOYEE_ID, [employee_id]);
        return res.status(200).json(
            {
                "success": true,
                "message": "Employee found.",
                "status": 200,
                "data": {
                    ...response[0][0],
                    "permissions": [
                        3000,
                        3001,
                        3002,
                        3003, 3004, 3005, 3006, 3007, 3008
                    ],
                    role: 'employee'
                },
                "timestamp": new Date()
            }
        )
    } catch (error) {
        next(error)
    } finally {
        await connection.end();
    }
}


module.exports = { getEmployeeProfile }