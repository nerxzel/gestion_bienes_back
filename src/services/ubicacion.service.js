import prisma from "../config/prisma.js";
import { trimAndCapitalize, parseAndValidateId } from "../utils/utility-methods.js";
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
    if (!data.nombre) {
        throw new Error("El nombre es obligatorio");
    }

    const normalizedNombre = trimAndCapitalize(data.nombre);

    const duplicatedUbicacion = await prisma.ubicacion.findFirst({
        where: { nombre: normalizedNombre }
    });

    if (duplicatedUbicacion) {
        throw new ConflictError("Esta ubicacion ya existe");
    }

    const newUbicacion = await prisma.ubicacion.create({
        data: {
            nombre: normalizedNombre,
        }
    });
    return newUbicacion;
}

const updateUbicacion = async (id, data) => {
    const idInt = parseAndValidateId(id);

    const normalizedNombre = trimAndCapitalize(data.nombre);

    const ubicacionExists = await prisma.ubicacion.findUnique({
        where: { id: idInt }
    });

    if (!ubicacionExists) {
        throw new NotFoundError("Esta ubicacion no existe");
    }

    const duplicatedUbicacion = await prisma.ubicacion.findFirst({
        where: { nombre: normalizedNombre, NOT: { id: idInt } }
    })

    if (duplicatedUbicacion) {
        throw new ConflictError("Esta ubicacion ya existe");
    }

    const ubicacion = await prisma.ubicacion.update({
        where: { id: idInt },
        data: {
            nombre: normalizedNombre,
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