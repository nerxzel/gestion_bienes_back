class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
    }
}

class BadRequestError extends AppError {
    constructor(message = 'Petición inválida') {
        super(message, 400);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'No autorizado. Por favor inicie sesión.') {
        super(message, 401);
    }
}

class ForbiddenError extends AppError {
    constructor(message = 'No tiene permisos para realizar esta acción.') {
        super(message, 403);
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Recurso no encontrado') {
        super(message, 404);
    }
}

class ConflictError extends AppError {
    constructor(message = 'Conflicto con el estado actual del recurso') {
        super(message, 409);
    }
}

class ValidationError extends AppError {
    constructor(message = 'Datos de entrada inválidos') {
        super(message, 422);
    }
}

class InternalServerError extends AppError {
    constructor(message = 'Error interno del servidor') {
        super(message, 500);
    }
}

export {
    AppError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    ValidationError,
    InternalServerError
};