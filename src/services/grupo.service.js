import prisma from "../config/prisma.js";
import { trimAndCapitalize, parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError, BadRequestError } from "../utils/app-error.js"

const getAllGrupos = async () => {
    const grupos = await prisma.grupo.findMany();
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
    if (!data.nombre) {
        throw new BadRequestError("El nombre es obligatorio");
    }

    if (!data.vidaUtil) {
        throw new BadRequestError("La vida útil es obligatoria");
    }

    const normalizedNombre = trimAndCapitalize(data.nombre);

    const duplicatedGrupo = await prisma.grupo.findFirst({
        where: { nombre: normalizedNombre }
    });

    if (duplicatedGrupo) {
        throw new ConflictError("Este grupo ya existe");
    }

    const newGrupo = await prisma.grupo.create({
        data: {
            nombre: normalizedNombre,
            vidaUtil: parseInt(data.vidaUtil),
        }
    });
    return newGrupo;
}

const updateGrupo = async (id, data) => {
    const idInt = parseAndValidateId(id);
    const payloadToUpdate = {};

    if (data.nombre) {
        const capitalizedNombre = trimAndCapitalize(data.nombre);
        payloadToUpdate.nombre = capitalizedNombre;
    }

    if (data.vidaUtil) {
        payloadToUpdate.vidaUtil = parseInt(data.vidaUtil);
    }

    const grupoExists = await prisma.grupo.findUnique({
        where: { id: idInt }
    });

    if (!grupoExists) {
        throw new NotFoundError("Este grupo no existe");
    }

    if (Object.keys(payloadToUpdate).length === 0) {
        return grupoExists;
    }

    if (payloadToUpdate.nombre) {
        const duplicatedGrupo = await prisma.grupo.findFirst({
            where: { nombre: payloadToUpdate.nombre, NOT: { id: idInt } }
        });

        if (duplicatedGrupo) {
            throw new ConflictError("Este grupo ya existe");
        }
    }

    const updatedGrupo = await prisma.grupo.update({
        where: { id: idInt },
        data: payloadToUpdate,
    });
    return updatedGrupo;
}

export default {
    createGrupo,
    getAllGrupos,
    getGrupoById,
    updateGrupo,
}