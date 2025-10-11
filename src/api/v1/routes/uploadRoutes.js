const Routes = require('express');
const multer = require('multer');
const { UploadTemp, UplodToAws } = require('../handlers/uploadHandler');
const successHandler = require('../../middleware/successHandler');
const uploadRoutes = Routes();


const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

uploadRoutes
    .post('/', upload.single('image'), async (req, res, next) => {
        const { file } = req;
        try {
            const aws = new UplodToAws();
            const response = await aws.upload(file);
            return res.status(200).json(successHandler(response, 'File upload successfully', 200))
        } catch (error) {
            next(error);
        }
    })

module.exports = uploadRoutes