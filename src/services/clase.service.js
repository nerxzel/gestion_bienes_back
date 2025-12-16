import prisma from "../config/prisma.js";
import { parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllClases = async (params = {}) => {
    const { grupoId, dropdown } = params;

    const where = {};
    if (grupoId) {
        where.grupoId = parseInt(grupoId)
    }

    const select = dropdown ? {
        id: true,
        nombre: true,
    } : undefined;

    const clases = await prisma.clase.findMany({
        where: where,
        select: select,
        orderBy: { id: 'desc' }
    });
    return clases;
}

const getClaseById = async (id) => {
    const idInt = parseAndValidateId(id);
    const clase = await prisma.clase.findUnique({
        where: { id: idInt }
    });

    if (!clase) {
        throw new NotFoundError("Esta clase no existe");
    }

    return clase;
}

const createClase = async (data) => {
    const parentGrupoExists = await prisma.grupo.findUnique({
        where: { id: data.grupoId }
    });
    if (!parentGrupoExists) {
        throw new NotFoundError("Este grupo no existe");
    }

    const duplicatedClase = await prisma.clase.findFirst({
        where: { nombre: data.nombre, grupoId: data.grupoId }
    });

    if (duplicatedClase) {
        throw new ConflictError("Esta clase ya existe en este grupo");
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
    const idInt = parseAndValidateId(id);

    const claseExists = await prisma.clase.findUnique({
        where: { id: idInt }
    });

    if (!claseExists) {
        throw new NotFoundError("Esta clase no existe");
    }

    if (Object.keys(data).length === 0) {
        return claseExists;
    }

    if (data.grupoId) {
        const parentGrupoExists = await prisma.grupo.findUnique({
            where: { id: data.grupoId }
        });
        if (!parentGrupoExists) {
            throw new NotFoundError("Este grupo no existe");
        }
    }

    if (data.nombre || data.grupoId) {
        const newNombre = data.nombre || claseExists.nombre;
        const newGrupoId = data.grupoId || claseExists.grupoId;

        const duplicatedClase = await prisma.clase.findFirst({
            where: {
                nombre: newNombre,
                grupoId: newGrupoId,
                NOT: { id: idInt },
            }
        });

        if (duplicatedClase) {
            throw new ConflictError("Esta clase ya existe en este grupo");
        }
    }

    return await prisma.clase.update({
        where: { id: idInt },
        data: data,
    });
}

export default {
    createClase,
    getAllClases,
    getClaseById,
    updateClase,
}