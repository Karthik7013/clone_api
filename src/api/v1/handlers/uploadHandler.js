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
            filename,
            size
        } = fileInfo;
        const response = await axios.post('https://imgbb.com/json', formData, {
            headers: formData.getHeaders(),
        });

        if (response.status !== 200 || !response.data.image || !response.data.image.url) {
            throw new Error('Failed to upload image: Invalid response from upload server');
        }
        await connection.execute(UPLOAD_FILE, [originalname, filename, response.data.image.url, fieldname, mimetype, size]);
        const fileUrl = response.data.image;
        return fileUrl;
    } catch (error) {
        throw error;
    }
}

module.exports = uploadHandler;