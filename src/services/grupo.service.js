import prisma from "../config/prisma.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllGrupos = async () => {
    const grupos = await prisma.grupo.findMany();
    return grupos;
}

const getAllActiveGrupos = async () => {
    const grupos = await prisma.grupo.findMany({
        where: { isDeleted: false }
    });
    return grupos;
}

const getGrupoById = async (id) => {
    const grupo = await prisma.grupo.findUnique({
        where: { id: parseInt(id) }
    });

    if (!grupo || grupo.isDeleted) {
        throw new NotFoundError("Este grupo no existe o ya fue eliminado");
    }

    return grupo;
}

const createGrupo = async (data) => {

    const duplicatedGrupo = await prisma.grupo.findFirst({
        where: { nombre: data.nombre, isDeleted: false }
    });

    if (duplicatedGrupo) {
        throw new ConflictError("Este grupo ya existe");
    }

    const newGrupo = await prisma.grupo.create({
        data: {
            nombre: data.nombre,
            vidaUtil: parseInt(data.vidaUtil),
        }
    });
    return newGrupo;
}

const updateGrupo = async (id, data) => {
    const idInt = parseInt(id);

    const grupoExists = await prisma.grupo.findUnique({
        where: { id: idInt }
    });

    if (!grupoExists || grupoExists.isDeleted) {
        throw new NotFoundError("Este grupo no existe o ya fue eliminado");
    }

    const grupo = await prisma.grupo.update({
        where: { id: parseInt(id) },
        data: {
            nombre: data.nombre,
            vidaUtil: data.vidaUtil ? parseInt(data.vidaUtil) : undefined,
        }
    });
    return grupo;
}

// Not sure if this will be implemented in the future
const softDeleteGrupo = async (id) => {
    const idInt = parseInt(id);

    const grupoExists = await prisma.grupo.findUnique({
        where: { id: idInt }
    });
    if (!grupoExists || grupoExists.isDeleted) {
        throw new NotFoundError("Este grupo no existe o ya fue eliminado");
    }

    const relatedBien = await prisma.bien.count({
        where: { grupoId: idInt, isDeleted: false }
    });
    if (relatedBien > 0) {
        throw new ConflictError("Este grupo tiene bienes asociados activos");
    }

    const relatedClase = await prisma.clase.count({
        where: { grupoId: idInt, isDeleted: false }
    });
    if (relatedClase > 0) {
        throw new ConflictError("Este grupo tiene clases asociadas activas");
    }

    const deletedGrupo = await prisma.grupo.update({
        where: { id: idInt },
        data: { isDeleted: true }
    });

    return deletedGrupo;
}

export default {
    createGrupo,
    getAllGrupos,
    getAllActiveGrupos,
    getGrupoById,
    updateGrupo,
    softDeleteGrupo
}