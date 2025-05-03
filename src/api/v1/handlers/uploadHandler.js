const axios = require('axios');
const uploadHandler = async (formData) => {
    try {
        const response = await axios.post('https://uploadimgur.com/upload', formData, {
            headers: formData.getHeaders(),
        });
        const fileUrl = response.data
        return fileUrl;
    } catch (error) {
        throw error;
    }
}

module.exports = uploadHandler;