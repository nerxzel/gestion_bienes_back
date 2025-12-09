import prisma from "../config/prisma.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllModelos = async () => {
    const modelos = await prisma.modelo.findMany();
    return modelos;
}

const getAllActiveModelos = async () => {
    const modelos = await prisma.modelo.findMany({
        where: { isDeleted: false }
    });
    return modelos;
}

const getModeloById = async (id) => {
    const modelo = await prisma.modelo.findUnique({
        where: { id: parseInt(id) }
    });

    if (!modelo || modelo.isDeleted) {
        throw new NotFoundError("Este modelo no existe o ya fue eliminado");
    }

    return modelo;
}

const createClase = async (data) => {

    if (data.grupoId) {
        const grupoExists = await prisma.grupo.findUnique({
            where: { id: parseInt(data.grupoId) }
        });
        if (!grupoExists || grupoExists.isDeleted) {
            throw new NotFoundError("Este grupo no existe o ya fue eliminado");
        }
    }

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

    if (data.grupoId) {
        const grupoExists = await prisma.grupo.findUnique({
            where: { id: parseInt(data.grupoId) }
        });
        if (!grupoExists || grupoExists.isDeleted) {
            throw new NotFoundError("Este grupo no existe o ya fue eliminado");
        }
    }

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

    const relatedSubclase = await prisma.subclase.count({
        where: { claseId: idInt, isDeleted: false }
    });
    if (relatedSubclase > 0) {
        throw new ConflictError("Esta clase tiene subclases asociadas activas");
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