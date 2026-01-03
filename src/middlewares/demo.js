import { DemoError } from '../utils/app-error.js'; 

export const restrictDemoUser = (req, res, next) => {
 
    if (req.user && req.user.email === 'invitado@demo.com') {
        
        if (req.method !== 'GET') {
            return next(new DemoError("Acción no disponible en modo Demo"));
        }
    }

    next();
};