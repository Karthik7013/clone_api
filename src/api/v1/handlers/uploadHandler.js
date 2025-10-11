const axios = require('axios');
const fs = require('node:fs');
const FormData = require('form-data');

class UploadHandler {
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

class UplodToAws extends UploadHandler {
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
            const fileBuffer = fs.readFileSync(path);
            const payload = {
                "action": "upload",
                "typeOfAction": "policy_doc",
                "fileBuffer": fileBuffer.toString('base64'),
                "contentType": mimetype || "application/octet-stream",
                "originalFilename": originalname,
                "fileSize": size
            }
            const { data } = await axios.post(
                'https://5il6my5wxc.execute-api.ap-south-1.amazonaws.com/Prod/bucketuploadhandler/policydocs',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log(data);
            if (!data.url) {
                throw new Error('Failed to upload')
            }
            const uploaded_file = {
                url: data.url,
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

class UploadTemp extends UploadHandler {
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
    UplodToAws,
    UploadTemp
};