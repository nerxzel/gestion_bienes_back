import prisma from "../config/prisma.js";
import { parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

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
    const parentClaseExists = await prisma.clase.findUnique({
        where: { id: data.claseId }
    });
    if (!parentClaseExists) {
        throw new NotFoundError("Esta clase no existe");
    }
    if (data.grupoId && parentClaseExists.grupoId !== data.grupoId) {
        throw new ConflictError("Esta clase pertenece a otro grupo");
    }

    const duplicatedSubclase = await prisma.subclase.findFirst({
        where: { nombre: data.nombre, claseId: data.claseId, grupoId: data.grupoId }
    });

    if (duplicatedSubclase) {
        throw new ConflictError("Esta subclase ya existe para esta clase y grupo");
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
    const idInt = parseAndValidateId(id);

    const subclaseExists = await prisma.subclase.findUnique({
        where: { id: idInt }
    });

    if (!subclaseExists) {
        throw new NotFoundError("Esta subclase no existe");
    }

    const finalClaseId = data.claseId ?? subclaseExists.claseId;
    const finalGrupoId = data.grupoId ?? subclaseExists.grupoId;

    if (data.claseId || data.grupoId) {
        const claseCheck = await prisma.clase.findUnique({
            where: { id: finalClaseId }
        });

        if (!claseCheck) {
            throw new NotFoundError("La clase asignada no existe");
        }

        if (claseCheck.grupoId !== finalGrupoId) {
            throw new ConflictError("La clase seleccionada no pertenece al grupo indicado");
        }
    }
    if (data.nombre || data.claseId || data.grupoId) {
        const finalNombre = data.nombre || subclaseExists.nombre;

        const duplicatedSubclase = await prisma.subclase.findFirst({
            where: {
                nombre: finalNombre,
                claseId: finalClaseId,
                grupoId: finalGrupoId,
                NOT: { id: idInt }
            }
        });

        if (duplicatedSubclase) {
            throw new ConflictError("Esta subclase ya existe para esta clase y grupo");
        }
    }

    return await prisma.subclase.update({
        where: { id: idInt },
        data: data
    });
}

export default {
    createSubclase,
    getAllSubclases,
    getSubclaseById,
    updateSubclase,
}