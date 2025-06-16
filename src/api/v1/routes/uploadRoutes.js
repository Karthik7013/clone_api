const Routes = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const uploadHandler = require('../handlers/uploadHandler');
const successHandler = require('../../middleware/successHandler');
const uploadRoutes = Routes();


const upload = multer({ dest: 'uploads/' });
uploadRoutes.post('/', upload.single('image'), async (req, res, next) => {
    try {
        const filePath = req.file.path;
        const fileStream = fs.createReadStream(filePath);
        const formData = new FormData();
        formData.append('image', fileStream, req.file.originalname);
        const response = await uploadHandler(formData, req.file);
        fs.unlinkSync(filePath);
        return res.status(200).json(successHandler(response, 'Image upload successfully', 200))
    } catch (error) {
        next(error);
    }
})


module.exports = uploadRoutes