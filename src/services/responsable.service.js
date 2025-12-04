import prisma from "../config/prisma.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllResponsables = async () => {
    const responsables = await prisma.responsable.findMany();
    return responsables;
}

const getAllActiveResponsables = async () => {
    const responsables = await prisma.responsable.findMany({
        where: { isDeleted: false }
    });
    return responsables;
}

const getResponsableById = async (id) => {
    const responsable = await prisma.responsable.findUnique({
        where: { id: parseInt(id) }
    });

    if (!responsable || responsable.isDeleted) {
        throw new NotFoundError("Este responsable no existe o ya fue eliminado");
    }

    return responsable;
}

const createResponsable = async (data) => {

    const duplicatedResponsable = await prisma.responsable.findFirst({
        where: { nombre: data.nombre, isDeleted: false }
    });

    if (duplicatedResponsable) {
        throw new ConflictError("Este responsable ya existe");
    }

    const newResponsable = await prisma.responsable.create({
        data: {
            rut: data.rut,
            nombre: data.nombre,
            cargo: data.cargo,
        }
    });
    return newResponsable;
}

const updateResponsable = async (id, data) => {
    const idInt = parseInt(id);

    const responsableExists = await prisma.responsable.findUnique({
        where: { id: idInt }
    });

    if (!responsableExists || responsableExists.isDeleted) {
        throw new NotFoundError("Este responsable no existe o ya fue eliminado");
    }

    const responsable = await prisma.responsable.update({
        where: { id: parseInt(id) },
        data: {
            rut: data.rut,
            nombre: data.nombre,
            cargo: data.cargo,
        }
    });
    return responsable;
}

// Not sure if this will be implemented in the future
const softDeleteResponsable = async (id) => {
    const idInt = parseInt(id);

    const responsableExists = await prisma.responsable.findUnique({
        where: { id: idInt }
    });
    if (!responsableExists || responsableExists.isDeleted) {
        throw new NotFoundError("Este responsable no existe o ya fue eliminado");
    }

    const relatedBien = await prisma.bien.count({
        where: { responsableId: idInt, isDeleted: false }
    });
    if (relatedBien > 0) {
        throw new ConflictError("Este responsable tiene bienes asociados activos");
    }

    const deletedResponsable = await prisma.responsable.update({
        where: { id: idInt },
        data: { isDeleted: true }
    });

    return deletedResponsable;
}

export default {
    createResponsable,
    getAllResponsables,
    getAllActiveResponsables,
    getResponsableById,
    updateResponsable,
    softDeleteResponsable
}