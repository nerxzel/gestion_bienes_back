import prisma from "../config/prisma.js";
import { parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllGrupos = async (params = {}) => {
    const { dropdown } = params;

    const select = dropdown ? {
        id: true,
        nombre: true,
    } : undefined

    const grupos = await prisma.grupo.findMany({
        select: select,
        orderBy: { id: 'desc' }
    });
    return grupos;
}

const getGrupoById = async (id) => {
    const idInt = parseAndValidateId(id);
    const grupo = await prisma.grupo.findUnique({
        where: { id: idInt }
    });

    if (!grupo) {
        throw new NotFoundError("Este grupo no existe");
    }

    return grupo;
}

const createGrupo = async (data) => {
    const duplicatedGrupo = await prisma.grupo.findFirst({
        where: { nombre: data.nombre }
    });

    if (duplicatedGrupo) {
        throw new ConflictError("Este grupo ya existe");
    }

    const newGrupo = await prisma.grupo.create({
        data: {
            nombre: data.nombre,
            vidaUtil: data.vidaUtil,
        }
    });
    return newGrupo;
}

const updateGrupo = async (id, data) => {
    const idInt = parseAndValidateId(id);

    const grupoExists = await prisma.grupo.findUnique({
        where: { id: idInt }
    });

    if (!grupoExists) {
        throw new NotFoundError("Este grupo no existe");
    }

    if (Object.keys(data).length === 0) {
        return grupoExists;
    }

    if (data.nombre) {
        const duplicatedGrupo = await prisma.grupo.findFirst({
            where: { nombre: data.nombre, NOT: { id: idInt } }
        });

        if (duplicatedGrupo) {
            throw new ConflictError("Este grupo ya existe");
        }
    }

    const updatedGrupo = await prisma.grupo.update({
        where: { id: idInt },
        data: data,
    });
    return updatedGrupo;
}

export default {
    createGrupo,
    getAllGrupos,
    getGrupoById,
    updateGrupo,
}