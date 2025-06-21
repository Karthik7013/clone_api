const Router = require('express');
const successHandler = require('../../middleware/successHandler');
const { mediaHandler } = require('../handlers/mediaHandler');
const mediaRoutes = Router();

mediaRoutes.get('/:file_key', async (req, res, next) => {
    try {
        const response = await mediaHandler(req);
        return res.status(301).redirect(response);
    } catch (error) {
        next(error)
    }
})

module.exports = mediaRoutes;