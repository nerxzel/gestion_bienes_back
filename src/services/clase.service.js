import prisma from "../config/prisma.js";
import { capitalize } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError, BadRequestError } from "../utils/app-error.js"

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
    if (!data.nombre) {
        throw new BadRequestError("El nombre es obligatorio");
    }

    if (!data.grupoId) {
        throw new BadRequestError("El grupo es obligatorio");
    }

    const capitalizedNombre = capitalize(data.nombre);
    const grupoIdInt = parseInt(data.grupoId);

    const parentGrupoExists = await prisma.grupo.findUnique({
        where: { id: grupoIdInt }
    });
    if (!parentGrupoExists || parentGrupoExists.isDeleted) {
        throw new NotFoundError("Este grupo no existe o ya fue eliminado");
    }

    const duplicatedClase = await prisma.clase.findFirst({
        where: { nombre: capitalizedNombre, grupoId: grupoIdInt }
    });

    if (duplicatedClase) {

        if (!duplicatedClase.isDeleted) {
            throw new ConflictError("Esta clase ya existe en este grupo");
        }

        const softDeletedClase = await prisma.clase.update({
            where: { id: duplicatedClase.id },
            data: {
                nombre: capitalizedNombre,
                isDeleted: false
            }
        });
        return softDeletedClase;
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
    const idInt = parseInt(id);
    const payloadToUpdate = {};

    if (data.nombre) {
        const capitalizedNombre = capitalize(data.nombre);
        payloadToUpdate.nombre = capitalizedNombre;
    }

    if (data.grupoId) {
        const grupoIdInt = parseInt(data.grupoId)
        payloadToUpdate.grupoId = grupoIdInt;

        const parentGrupoExists = await prisma.grupo.findUnique({
            where: { id: grupoIdInt }
        });
        if (!parentGrupoExists || parentGrupoExists.isDeleted) {
            throw new NotFoundError("Este grupo no existe o ya fue eliminado");
        }
    }

    if (!idInt) {
        throw new BadRequestError("El id es obligatorio");
    }

    console.log(payloadToUpdate);
    const claseExists = await prisma.clase.findUnique({
        where: { id: idInt }
    });

    if (!claseExists || claseExists.isDeleted) {
        throw new NotFoundError("Esta clase no existe o ya fue eliminada");
    }

    if (Object.keys(payloadToUpdate).length !== 0) {
        const newNombre = payloadToUpdate.nombre || claseExists.nombre;
        const newGrupoId = payloadToUpdate.grupoId || claseExists.grupoId;

        const duplicatedClase = await prisma.clase.findFirst({
            where: {
                nombre: newNombre,
                grupoId: newGrupoId,
                NOT: { id: idInt },
                isDeleted: false
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