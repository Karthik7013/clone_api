const connectToDatabase = require("../db/db");
const { GET_AGENT_ID } = require("../db/queries/queries.constants");


// @desc     get agent profile
// @route    /profile
// @access   private
const getAgentProfile = async (req, res, next) => {
    const connection = await connectToDatabase();
    const agent_id = req.auth.loginId;
    try {
        const response = await connection.execute(GET_AGENT_ID, [agent_id]);
        return res.status(200).json(
            {
                "success": true,
                "message": "Agent found.",
                "status": 200,
                "data": {
                    ...response[0][0],
                    "permissions": [
                        2000,
                        2001,
                        2002,
                        2003, 2004, 2005, 2006, 2007
                    ],
                    role: 'agent'
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

module.exports = { getAgentProfile }