import prisma from "../config/prisma.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllSubclases = async () => {
    const subclases = await prisma.subclase.findMany();
    return subclases;
}

const getAllActiveSubclases = async () => {
    const subclases = await prisma.subclase.findMany({
        where: { isDeleted: false }
    });
    return subclases;
}

const getSubclaseById = async (id) => {
    const subclase = await prisma.subclase.findUnique({
        where: { id: parseInt(id) }
    });

    if (!subclase || subclase.isDeleted) {
        throw new NotFoundError("Esta subclase no existe o ya fue eliminada");
    }

    return subclase;
}

const createSubclase = async (data) => {

    if (data.claseId) {
        const claseExists = await prisma.clase.findUnique({
            where: { id: parseInt(data.claseId) }
        });
        if (!claseExists || claseExists.isDeleted) {
            throw new NotFoundError("Esta clase no existe o ya fue eliminada");
        }
        if (data.grupoId && claseExists.grupoId !== parseInt(data.grupoId)) {
            throw new ConflictError("Esta clase pertenece a otro grupo");
        }
    }

    const duplicatedSubclase = await prisma.subclase.findFirst({
        where: { nombre: data.nombre, isDeleted: false }
    });

    if (duplicatedSubclase) {
        throw new ConflictError("Esta subclase ya existe");
    }

    const newSubclase = await prisma.subclase.create({
        data: {
            nombre: data.nombre,
            claseId: data.claseId,
            grupoId: data.grupoId,
        }
    });
    return newSubclase;
}

const updateSubclase = async (id, data) => {
    const idInt = parseInt(id);

    const subclaseExists = await prisma.subclase.findUnique({
        where: { id: idInt }
    });

    if (!subclaseExists || subclaseExists.isDeleted) {
        throw new NotFoundError("Esta subclase no existe o ya fue eliminada");
    }

    if (data.claseId) {
        const newClase = await prisma.clase.findUnique({
            where: { id: parseInt(data.claseId) }
        });

        if (!newClase || newClase.isDeleted) {
            throw new NotFoundError("La clase asignada no existe o fue eliminada");
        }

        const grupoIdToUse = data.grupoId ? parseInt(data.grupoId) : subclaseExists.grupoId;

        if (newClase.grupoId !== grupoIdToUse) {
            throw new ConflictError("Inconsistencia: La clase seleccionada pertenece a otro grupo");
        }
    } else if (data.grupoId) {
        const currentClase = await prisma.clase.findUnique({
            where: { id: subclaseExists.claseId }
        });

        if (currentClase.grupoId !== parseInt(data.grupoId)) {
            throw new ConflictError("Inconsistencia: La clase actual pertenece a otro grupo");
        }
    }

    const subclase = await prisma.subclase.update({
        where: { id: idInt },
        data: {
            nombre: data.nombre,
            claseId: data.claseId,
            grupoId: data.grupoId,
        }
    });
    return subclase;
}

// Not sure if this will be implemented in the future
const softDeleteSubclase = async (id) => {
    const idInt = parseInt(id);

    const subclaseExists = await prisma.subclase.findUnique({
        where: { id: idInt }
    });
    if (!subclaseExists || subclaseExists.isDeleted) {
        throw new NotFoundError("Esta subclase no existe o ya fue eliminada");
    }

    const relatedBien = await prisma.bien.count({
        where: { subclaseId: idInt, isDeleted: false }
    });
    if (relatedBien > 0) {
        throw new ConflictError("Esta subclase tiene bienes asociados activos");
    }

    const deletedSubclase = await prisma.subclase.update({
        where: { id: idInt },
        data: { isDeleted: true }
    });

    return deletedSubclase;
}

export default {
    createSubclase,
    getAllSubclases,
    getAllActiveSubclases,
    getSubclaseById,
    updateSubclase,
    softDeleteSubclase
}