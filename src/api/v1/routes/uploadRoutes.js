const Routes = require('express');
const multer = require('multer');
const { UploadTemp } = require('../handlers/uploadHandler');
const successHandler = require('../../middleware/successHandler');
const uploadRoutes = Routes();


const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024 // 5MB limit
    }
});
// uploadRoutes.post('/', upload.single('image'), async (req, res, next) => {
//     const filePath = req.file.path;
//     try {
//         const fileStream = fs.createReadStream(filePath);
//         const formData = new FormData();
//         formData.append('source', fileStream, req.file.originalname);
//         formData.append('type', 'file');
//         formData.append('action', 'upload');
//         formData.append('timestamp', '1752474815326');
//         formData.append('auth_token', auth_token);
//         const response = await uploadHandler(formData, req.file);
//         return res.status(200).json(successHandler(response, 'Image upload successfully', 200))
//     } catch (error) {
//         next(error);
//     } finally {
//         fs.unlinkSync(filePath);
//     }
// })

uploadRoutes.post('/', upload.single('image'), async (req, res, next) => {
    const { file } = req;
    try {
        const temUpload = new UploadTemp();
        const response = await temUpload.upload(file);
        return res.status(200).json(successHandler(response, 'File upload successfully', 200))
    } catch (error) {
        next(error);
    }
})


module.exports = uploadRoutes