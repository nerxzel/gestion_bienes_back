import prisma from "../config/prisma.js";
import { trimAndCapitalize, parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError, BadRequestError } from "../utils/app-error.js"

const getAllSubclases = async () => {
    const subclases = await prisma.subclase.findMany();
    return subclases;
}

const getSubclaseById = async (id) => {
    const idInt = parseAndValidateId(id);
    const subclase = await prisma.subclase.findUnique({
        where: { id: idInt }
    });

    if (!subclase) {
        throw new NotFoundError("Esta subclase no existe");
    }

    return subclase;
}

const createSubclase = async (data) => {
    if (!data.nombre) {
        throw new BadRequestError("El nombre es obligatorio");
    }

    if (!data.claseId) {
        throw new BadRequestError("La clase es obligatoria");
    }

    if (!data.grupoId) {
        throw new BadRequestError("El grupo es obligatorio");
    }

    const normalizedNombre = trimAndCapitalize(data.nombre);
    const claseIdInt = parseInt(data.claseId);
    const grupoIdInt = parseInt(data.grupoId);

    if (data.claseId) {
        const claseExists = await prisma.clase.findUnique({
            where: { id: claseIdInt }
        });
        if (!claseExists) {
            throw new NotFoundError("Esta clase no existe");
        }
        if (data.grupoId && claseExists.grupoId !== grupoIdInt) {
            throw new ConflictError("Esta clase pertenece a otro grupo");
        }
    }

    const duplicatedSubclase = await prisma.subclase.findFirst({
        where: { nombre: normalizedNombre, claseId: claseIdInt, grupoId: grupoIdInt }
    });

    if (duplicatedSubclase) {
        throw new ConflictError("Esta subclase ya existe para esta clase y grupo");
    }

    const newSubclase = await prisma.subclase.create({
        data: {
            nombre: normalizedNombre,
            claseId: claseIdInt,
            grupoId: grupoIdInt,
        }
    });
    return newSubclase;
}

const updateSubclase = async (id, data) => {
    const idInt = parseAndValidateId(id);

    const currentSubclase = await prisma.subclase.findUnique({
        where: { id: idInt }
    });

    if (!currentSubclase) {
        throw new NotFoundError("Esta subclase no existe");
    }

    const payloadToUpdate = {};

    if (data.nombre) {
        payloadToUpdate.nombre = trimAndCapitalize(data.nombre);
    }

    const newClaseId = data.claseId ? parseInt(data.claseId) : null;
    const newGrupoId = data.grupoId ? parseInt(data.grupoId) : null;

    if (newClaseId) payloadToUpdate.claseId = newClaseId;
    if (newGrupoId) payloadToUpdate.grupoId = newGrupoId;

    const finalClaseId = newClaseId ?? currentSubclase.claseId;
    const finalGrupoId = newGrupoId ?? currentSubclase.grupoId;
    if (newClaseId || newGrupoId) {
        const claseCheck = await prisma.clase.findUnique({
            where: { id: finalClaseId }
        });

        if (!claseCheck) {
            throw new NotFoundError("La clase asignada no existe");
        }

        if (claseCheck.grupoId !== finalGrupoId) {
            throw new ConflictError("La clase seleccionada no pertenece al grupo indicado");
        }

        if (newGrupoId) {
            const grupoCheck = await prisma.grupo.findUnique({ where: { id: newGrupoId } });
            if (!grupoCheck) throw new NotFoundError("El grupo asignado no existe");
        }
    }

    if (payloadToUpdate.nombre || payloadToUpdate.claseId) {
        const nombreCheck = payloadToUpdate.nombre || currentSubclase.nombre;

        const duplicated = await prisma.subclase.findFirst({
            where: {
                nombre: nombreCheck,
                claseId: finalClaseId,
                NOT: { id: idInt }
            }
        });

        if (duplicated) {
            throw new ConflictError("Ya existe una subclase con este nombre en la clase seleccionada");
        }
    }

    if (Object.keys(payloadToUpdate).length === 0) {
        return currentSubclase;
    }

    const subclase = await prisma.subclase.update({
        where: { id: idInt },
        data: payloadToUpdate,
    });

    return subclase;
}

export default {
    createSubclase,
    getAllSubclases,
    getSubclaseById,
    updateSubclase,
}