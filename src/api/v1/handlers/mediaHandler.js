const { connectToDatabase } = require("../../config/db");
const { GET_MEDIA_KEY, DELETE_FILE } = require("../../config/queries.constants");

const getMediaHandler = async (req) => {
    try {
        const { file_key } = req.params;
        if (!file_key) {
            const notFoundErr = new Error('File Not Found');
            throw notFoundErr;
        }
        const connection = await connectToDatabase();
        const [result] = await connection.execute(GET_MEDIA_KEY, [file_key]);
        if (!result.length) {
            const notFoundErr = new Error('File Not Found');
            notFoundErr.status = 404
            throw notFoundErr;
        }
        const [file] = result;
        return file.file_url;
    } catch (error) {
        throw error;
    }
}
const deleteMediaHandler = async (req) => {
    try {

        const { file_key } = req.params;
        if (!file_key) {
            const notFoundErr = new Error('File Not Found');
            notFoundErr.status = 404
            throw notFoundErr;
        }
        const connection = await connectToDatabase();
        const [result] = await connection.execute(DELETE_FILE, [file_key]);
        console.log(result.affectedRows)
        if (result.affectedRows === 0) {
            const notFoundErr = new Error('File Not Found');
            notFoundErr.status = 404
            throw notFoundErr;
        }
        return `${result.affectedRows} Files deleted`;
    } catch (error) {
        throw error;
    }
}



module.exports = { getMediaHandler, deleteMediaHandler }