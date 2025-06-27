const Router = require('express');
const successHandler = require('../../middleware/successHandler');
const { getMediaHandler, deleteMediaHandler } = require('../handlers/mediaHandler');
const mediaRoutes = Router();

mediaRoutes.get('/:file_key', async (req, res, next) => {
    try {
        const response = await getMediaHandler(req);
        return res.status(301).redirect(response);
    } catch (error) {
        next(error)
    }
})
mediaRoutes.delete('/:file_key', async (req, res, next) => {
    try {
        const response = await deleteMediaHandler(req);
         return res.status(200).json(
            successHandler(
                response,
                'File Deleted Successfully',
                200
            )
        );
    } catch (error) {
        next(error)
    }
})

module.exports = mediaRoutes;