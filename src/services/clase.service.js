import prisma from "../config/prisma.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllClases = async () => {
    const clases = await prisma.clase.findMany();
    return clases;
}

const getAllActiveClases = async () => {
    const clases = await prisma.clase.findMany({
        where: { isDeleted: false }
    });
    return clases;
}

const getClaseById = async (id) => {
    const clase = await prisma.clase.findUnique({
        where: { id: parseInt(id) }
    });

    if (!clase || clase.isDeleted) {
        throw new NotFoundError("Esta clase no existe o ya fue eliminada");
    }

    return clase;
}

const createClase = async (data) => {

    const duplicatedClase = await prisma.clase.findFirst({
        where: { nombre: data.nombre, isDeleted: false }
    });

    if (duplicatedClase) {
        throw new ConflictError("Esta clase ya existe");
    }

    const newClase = await prisma.clase.create({
        data: {
            nombre: data.nombre,
            grupoId: data.grupoId,
        }
    });
    return newClase;
}

const updateClase = async (id, data) => {
    const idInt = parseInt(id);

    const claseExists = await prisma.clase.findUnique({
        where: { id: idInt }
    });

    if (!claseExists || claseExists.isDeleted) {
        throw new NotFoundError("Esta clase no existe o ya fue eliminada");
    }

    const clase = await prisma.clase.update({
        where: { id: parseInt(id) },
        data: {
            nombre: data.nombre,
            grupoId: data.grupoId,
        }
    });
    return clase;
}

// Not sure if this will be implemented in the future
const softDeleteClase = async (id) => {
    const idInt = parseInt(id);

    const claseExists = await prisma.clase.findUnique({
        where: { id: idInt }
    });
    if (!claseExists || claseExists.isDeleted) {
        throw new NotFoundError("Esta clase no existe o ya fue eliminada");
    }

    const relatedBien = await prisma.bien.count({
        where: { claseId: idInt, isDeleted: false }
    });
    if (relatedBien > 0) {
        throw new ConflictError("Esta clase tiene bienes asociados activos");
    }

    const relatedClase = await prisma.clase.count({
        where: { grupoId: idInt, isDeleted: false }
    });
    if (relatedClase > 0) {
        throw new ConflictError("Esta clase tiene bienes asociados activos");
    }

    const deletedClase = await prisma.clase.update({
        where: { id: idInt },
        data: { isDeleted: true }
    });

    return deletedClase;
}

export default {
    createClase,
    getAllClases,
    getAllActiveClases,
    getClaseById,
    updateClase,
    softDeleteClase
}