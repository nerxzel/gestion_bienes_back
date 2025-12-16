import prisma from "../config/prisma.js";
import { parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllResponsables = async ( param = {} ) => {
    const { dropdown } = param;

    const select = dropdown ? {
        id: true,
        rut: true,
        nombre: true,
    } : undefined;

    const responsables = await prisma.responsable.findMany({
        select: select,
        orderBy: { id: 'desc' }
    });
    return responsables;
}

const getResponsableById = async (id) => {
    const idInt = parseAndValidateId(id);
    const responsable = await prisma.responsable.findUnique({
        where: { id: idInt }
    });

    if (!responsable) {
        throw new NotFoundError("Este responsable no existe");
    }

    return responsable;
}

const createResponsable = async (data) => {
    const duplicatedResponsable = await prisma.responsable.findFirst({
        where: { rut: data.rut }
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
    const idInt = parseAndValidateId(id);

    const responsableExists = await prisma.responsable.findUnique({
        where: { id: idInt }
    });

    if (!responsableExists) {
        throw new NotFoundError("Este responsable no existe");
    }

    if (Object.keys(data).length === 0) {
        return responsableExists;
    }

    if (data.rut) {
        const duplicatedResponsable = await prisma.responsable.findFirst({
            where: { rut: data.rut, NOT: { id: idInt } }
        });

        if (duplicatedResponsable) {
            throw new ConflictError("Este responsable ya existe");
        }
    }

    const responsable = await prisma.responsable.update({
        where: { id: idInt },
        data: data,
    });
    return responsable;
}

export default {
    createResponsable,
    getAllResponsables,
    getResponsableById,
    updateResponsable,
}