import prisma from "../config/prisma.js";
import bcrypt from 'bcrypt'
import { parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError, UnauthorizedError } from "../utils/app-error.js";

const getAllUsers = async (params = {}) => {
    const { dropdown } = params;

    const select = dropdown ? {
        id: true,
        name: true,
    } : undefined

    const users = await prisma.user.findMany({
        select: select,
        orderBy: { id: 'desc' }
    });
    return users;
}

const getUserById = async (id) => {
    const idInt = parseAndValidateId(id);
    const user = await prisma.user.findUnique({
        where: { id: idInt }
    });

    if (!user) {
        throw new NotFoundError("Este usuario no existe");
    }

    return user;
}

const createUser = async (data) => {
    const duplicatedUser = await prisma.user.findFirst({
        where: { email: data.email }
    });

    if (duplicatedUser) {
        throw new ConflictError("Este usuario ya existe, favor probar con otro correo.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt)

    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword
        }
    });

    const { password, ...noPasswordUser } = newUser;

    return noPasswordUser;
}

const validateUser = async (email, plainPassword) => {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new UnauthorizedError("Credenciales inválidas")
    }

    const isValid = await bcrypt.compare(plainPassword, user.password);

    if (!isValid) {
        throw new UnauthorizedError("Credenciales inválidas")
    }

    return user
}

const updateUser = async (id, data) => {
    const idInt = parseAndValidateId(id);

    const userExists = await prisma.user.findUnique({
        where: { id: idInt }
    });

    if (!userExists) {
        throw new NotFoundError("Este usuario no existe");
    }

    if (Object.keys(data).length === 0) {
        return userExists;
    }

    if (data.email) {
        const duplicatedUser = await prisma.user.findFirst({
            where: { email: data.email, NOT: { id: idInt } }
        });

        if (duplicatedUser) {
            throw new ConflictError("Este usuario ya existe");
        }
    }

    const updatedUser = await prisma.user.update({
        where: { id: idInt },
        data: data,
    });
    return updatedUser;
}

export default {
    createUser,
    validateUser,
    getAllUsers,
    getUserById,
    updateUser,
}