import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    logger.error(message, {
        stack: err.stack,
        method: req.method,
        url: req.originalUrl
    });

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};

export default errorHandler;