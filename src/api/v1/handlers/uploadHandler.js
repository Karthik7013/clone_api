const axios = require('axios');
const { connectToDatabase } = require('../../config/db');
const fs = require('node:fs')
const FormData = require('form-data');
const tool = {
    temp: async (formData, fileInfo) => {
        const {
            originalname,
            size
        } = fileInfo;
        try {
            const response = await axios.post('https://tmpfiles.org/api/v1/upload', formData, {
                headers: formData.getHeaders()
            });
            if (response.status !== 200 || !response.data.data.url) {
                throw new Error('Failed to upload file: Invalid response from upload server')
            };
            const originalUrl = response.data.data.url;
            const insertIndex = originalUrl.indexOf("tmpfiles.org/") + "tmpfiles.org/".length;
            const url = originalUrl.substring(0, insertIndex) + "dl/" + originalUrl.substring(insertIndex);
            const file = {
                url,
                filename: originalname,
                size_formatted: size,
                thumb_url: null,
                delete_url: null
            };
            return file;
        } catch (error) {
            throw error
        }
    }, //any file temporary
    perm: async (formData, fileInfo) => {
        const {
            originalname,
            size
        } = fileInfo;
        try {
            console.log(fileInfo);
            const response = await axios.post('https://imgbb.com/json', formData, {
                headers: formData.getHeaders()
            });

            if (response.status !== 200 || !response.data.image || !response.data.image.url) {
                throw new Error('Failed to upload image: Invalid response from upload server');
            }
            // await connection.execute(UPLOAD_FILE, [originalname, filename, response.data.image.url, fieldname, mimetype, size]);
            const file = response.data.image;
            return file;
        } catch (error) {
            throw error
        }
    }, //img file permanent
}

// const uploadHandler = async (formData, fileInfo) => {
//     try {
//         // const file = await tool['perm'](formData, fileInfo);
//         const file = tool['temp'](formData, fileInfo);
//         return file;
//     } catch (error) {
//         throw error;
//     }
// }


class UploadHandlerC {
    constructor() {
        this.file = {
            url: null,
            filename: null,
            size_formatted: 0,
            thumb_url: null,
            delete_url: null
        }
    }
    async upload() {
        throw new Error('Not Implemented');
    }
}

class UplodToAwsHandler extends UploadHandlerC {
    async upload(file) {
        return this.file
    }
}

class UploadTemp extends UploadHandlerC {
    async upload(file) {
        const {
            originalname,
            size,
            path,
            filename,
            destination,
            mimetype,
            encoding,
            fieldname
        } = file;
        try {
            const formData = new FormData();
            const fileStream = fs.createReadStream(path);
            formData.append('file', fileStream, {
                filename: originalname,
                contentType: mimetype,
                knownLength: size // Provide the size if known
            });
            const response = await axios.post('https://tmpfiles.org/api/v1/upload', formData, {
                headers: formData.getHeaders()
            });
            if (response.status !== 200 || !response.data.data.url) {
                throw new Error('Failed to upload file: Invalid response from upload server')
            };
            const originalUrl = response.data.data.url;
            const insertIndex = originalUrl.indexOf("tmpfiles.org/") + "tmpfiles.org/".length;
            const url = originalUrl.substring(0, insertIndex) + "dl/" + originalUrl.substring(insertIndex);
            const uploaded_file = {
                url,
                filename: originalname,
                size_formatted: size,
                thumb_url: null,
                delete_url: null
            };
            return uploaded_file;
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            fs.unlinkSync(path);
        }
    }
}

module.exports = {
    // uploadHandler,
    UplodToAwsHandler,
    UploadTemp
};