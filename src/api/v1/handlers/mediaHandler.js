const { connectToDatabase } = require("../../config/db");
const { GET_MEDIA_KEY } = require("../../config/queries.constants");

const mediaHandler = async (req) => {
    try {
        
        const { file_key } = req.params;
        if (!file_key) {
            const notFoundErr = new Error('File Not Found');
            throw notFoundErr;
        }
        const connection = await connectToDatabase();
        const [result] = await connection.execute(GET_MEDIA_KEY, [file_key]);
        const [file] = result;
        return file.file_url;
    } catch (error) {
        throw error;
    }
}



module.exports = { mediaHandler }