const axios = require('axios');
const { connectToDatabase } = require('../../config/db');
const { UPLOAD_FILE } = require('../../config/queries.constants');
const uploadHandler = async (formData, fileInfo) => {
    try {
        const connection = await connectToDatabase();
        const {
            fieldname,
            originalname,
            mimetype,
            size
        } = fileInfo;
        const response = await axios.post('https://uploadimgur.com/upload', formData, {
            headers: formData.getHeaders(),
        });

        if (response.status !== 200 || !response.data || !response.data.link) {
            throw new Error('Failed to upload image: Invalid response from upload server');
        }
        await connection.execute(UPLOAD_FILE, [originalname, response.data.link, fieldname, mimetype, size]);
        const fileUrl = response.data
        return fileUrl;
    } catch (error) {
        throw error;
    }
}

module.exports = uploadHandler;