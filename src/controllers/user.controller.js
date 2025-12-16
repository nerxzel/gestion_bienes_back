import userService from "../services/user.service.js";
import jwt from 'jsonwebtoken';

// GET /api/user
const findAll = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// GET /api/user/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// POST /api/user/
const createOne = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json({
            message: "Usuario registrado con exito",
            user: newUser
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/user/login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userService.validateUser(email, password);

        const secret = process.env.JWT_SECRET || "texto_temporal_de_reespaldo";

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }, secret,  {expiresIn: '8h' }
        );

        res.status(200).json({
            message: "Login exitoso",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        next(error)
    }
}

// PUT /api/user/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = await userService.updateUser(id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export default {
    findAll,
    login,
    findOneById,
    createOne,
    updateOne,
}