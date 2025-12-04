import prisma from "../config/prisma.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllUbicaciones = async () => {
    const ubicaciones = await prisma.ubicacion.findMany();
    return ubicaciones;
}

const getAllActiveUbicaciones = async () => {
    const ubicaciones = await prisma.ubicacion.findMany({
        where: { isDeleted: false }
    });
    return ubicaciones;
}

const getUbicacionById = async (id) => {
    const ubicacion = await prisma.ubicacion.findUnique({
        where: { id: parseInt(id) }
    });

    if (!ubicacion || ubicacion.isDeleted) {
        throw new NotFoundError("Esta ubicación no existe o ya fue eliminada");
    }

    return ubicacion;
}

const createUbicacion = async (data) => {

    const duplicatedUbicacion = await prisma.ubicacion.findFirst({
        where: { nombre: data.nombre, isDeleted: false }
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
    const idInt = parseInt(id);

    const ubicacionExists = await prisma.ubicacion.findUnique({
        where: { id: idInt }
    });

    if (!ubicacionExists || ubicacionExists.isDeleted) {
        throw new NotFoundError("Esta ubicacion no existe o ya fue eliminada");
    }

    const ubicacion = await prisma.ubicacion.update({
        where: { id: parseInt(id) },
        data: {
            nombre: data.nombre,
        }
    });
    return ubicacion;
}

// Not sure if this will be implemented in the future
const softDeleteUbicacion = async (id) => {
    const idInt = parseInt(id);

    const ubicacionExists = await prisma.ubicacion.findUnique({
        where: { id: idInt }
    });
    if (!ubicacionExists || ubicacionExists.isDeleted) {
        throw new NotFoundError("Esta ubicacion no existe o ya fue eliminada");
    }

    const relatedBien = await prisma.bien.count({
        where: { ubicacionId: idInt, isDeleted: false }
    });
    if (relatedBien > 0) {
        throw new ConflictError("Esta ubicacion tiene bienes asociados activos");
    }

    const deletedUbicacion = await prisma.ubicacion.update({
        where: { id: idInt },
        data: { isDeleted: true }
    });

    return deletedUbicacion;
}

export default {
    createUbicacion,
    getAllUbicaciones,
    getAllActiveUbicaciones,
    getUbicacionById,
    updateUbicacion,
    softDeleteUbicacion
}