import prisma from "../config/prisma.js";
import { parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllUbicaciones = async () => {
    const ubicaciones = await prisma.ubicacion.findMany();
    return ubicaciones;
}

const getUbicacionById = async (id) => {
    const idInt = parseAndValidateId(id);
    const ubicacion = await prisma.ubicacion.findUnique({
        where: { id: idInt }
    });

    if (!ubicacion) {
        throw new NotFoundError("Esta ubicación no existe");
    }

    return ubicacion;
}

const createUbicacion = async (data) => {
    const duplicatedUbicacion = await prisma.ubicacion.findFirst({
        where: { nombre: data.nombre }
    });

    if (duplicatedUbicacion) {
        throw new ConflictError("Esta ubicacion ya existe");
    }

    const newUbicacion = await prisma.ubicacion.create({
        data: {
            nombre: data.nombre,
        }
    });
    return newUbicacion;
}

const updateUbicacion = async (id, data) => {
    const idInt = parseAndValidateId(id);

    const ubicacionExists = await prisma.ubicacion.findUnique({
        where: { id: idInt }
    });

    if (!ubicacionExists) {
        throw new NotFoundError("Esta ubicacion no existe");
    }

    const duplicatedUbicacion = await prisma.ubicacion.findFirst({
        where: { nombre: data.nombre, NOT: { id: idInt } }
    })

    if (duplicatedUbicacion) {
        throw new ConflictError("Esta ubicacion ya existe");
    }

    const ubicacion = await prisma.ubicacion.update({
        where: { id: idInt },
        data: {
            nombre: data.nombre,
        }
    });
    return ubicacion;
}

export default {
    createUbicacion,
    getAllUbicaciones,
    getUbicacionById,
    updateUbicacion,
}