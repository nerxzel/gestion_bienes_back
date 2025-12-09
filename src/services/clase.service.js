import prisma from "../config/prisma.js";
import { trimAndCapitalize, parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError, BadRequestError } from "../utils/app-error.js"

const getAllClases = async () => {
    const clases = await prisma.clase.findMany();
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
    if (!data.nombre) {
        throw new BadRequestError("El nombre es obligatorio");
    }

    if (!data.grupoId) {
        throw new BadRequestError("El grupo es obligatorio");
    }

    const capitalizedNombre = trimAndCapitalize(data.nombre);
    const grupoIdInt = parseInt(data.grupoId);

    const parentGrupoExists = await prisma.grupo.findUnique({
        where: { id: grupoIdInt }
    });
    if (!parentGrupoExists) {
        throw new NotFoundError("Este grupo no existe");
    }

    const duplicatedClase = await prisma.clase.findFirst({
        where: { nombre: capitalizedNombre, grupoId: grupoIdInt }
    });

    if (duplicatedClase) {
        throw new ConflictError("Esta clase ya existe en este grupo");
    }

    const newClase = await prisma.clase.create({
        data: {
            nombre: capitalizedNombre,
            grupoId: grupoIdInt,
        }
    });
    return newClase;
}

const updateClase = async (id, data) => {
    const idInt = parseAndValidateId(id);
    const payloadToUpdate = {};

    if (data.nombre) {
        const capitalizedNombre = trimAndCapitalize(data.nombre);
        payloadToUpdate.nombre = capitalizedNombre;
    }

    if (data.grupoId) {
        const grupoIdInt = parseAndValidateId(data.grupoId)
        payloadToUpdate.grupoId = grupoIdInt;

        const parentGrupoExists = await prisma.grupo.findUnique({
            where: { id: grupoIdInt }
        });
        if (!parentGrupoExists) {
            throw new NotFoundError("Este grupo no existe");
        }
    }

    const claseExists = await prisma.clase.findUnique({
        where: { id: idInt }
    });

    if (!claseExists) {
        throw new NotFoundError("Esta clase no existe");
    }

    if (Object.keys(payloadToUpdate).length !== 0) {
        const newNombre = payloadToUpdate.nombre || claseExists.nombre;
        const newGrupoId = payloadToUpdate.grupoId || claseExists.grupoId;

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

        const updatedClase = await prisma.clase.update({
            where: { id: idInt },
            data: payloadToUpdate,
        });
        return updatedClase;
    }

    return claseExists;
}

export default {
    createClase,
    getAllClases,
    getClaseById,
    updateClase,
}