const notFound = (req, res) => {
    res.status(404).json({
        status: 'error',
        data: {
            method: req.method,
            message: 'The requested resource was not found.',
            code: 404,
            path: req.originalUrl
        }
    });
}
module.exports = notFound

