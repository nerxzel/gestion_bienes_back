import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/app-error.js';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new UnauthorizedError("Acceso denegado. Token no proporcionado."))
    }

    const secret = process.env.JWT_SECRET || "texto_temporal_de_reespaldo";

    jwt.verify(token, secret, (err, userDecoded) => {
        if (err) {
            return next(new UnauthorizedError("Token inválido o expirado. Por favor inicie sesión nuevamente."));
        }

        req.user = userDecoded;

        next();
});
}

export default authenticateToken;