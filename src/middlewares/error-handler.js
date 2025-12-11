import logger from '../config/logger.js';
import { ZodError } from 'zod';

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Error interno del servidor';

    if (err instanceof ZodError) {
        statusCode = 400;
        message = err.errors.map(issue => issue.message).join('. ');
    }

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