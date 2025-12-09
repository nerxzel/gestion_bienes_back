import prisma from "../config/prisma.js";
import { trimAndCapitalize, parseAndValidateId, validateRut } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllResponsables = async () => {
    const responsables = await prisma.responsable.findMany();
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
    const validatedRut = validateRut(data.rut);

    if (!data.nombre) {
        throw new BadRequestError("El nombre es obligatorio");
    }

    if (!data.cargo) {
        throw new BadRequestError("El cargo es obligatorio");
    }

    const normalizedNombre = trimAndCapitalize(data.nombre);
    const normalizedCargo = trimAndCapitalize(data.cargo);

    const duplicatedResponsable = await prisma.responsable.findFirst({
        where: { rut: validatedRut }
    });

    if (duplicatedResponsable) {
        throw new ConflictError("Este responsable ya existe");
    }

    const newResponsable = await prisma.responsable.create({
        data: {
            rut: validatedRut,
            nombre: normalizedNombre,
            cargo: normalizedCargo,
        }
    });
    return newResponsable;
}

const updateResponsable = async (id, data) => {
    const idInt = parseAndValidateId(id);
    const payloadToUpdate = {};

    if (data.nombre) {
        const normalizedNombre = trimAndCapitalize(data.nombre);
        payloadToUpdate.nombre = normalizedNombre;
    }

    if (data.cargo) {
        const normalizedCargo = trimAndCapitalize(data.cargo);
        payloadToUpdate.cargo = normalizedCargo;
    }

    if (data.rut) {
        const validatedRut = validateRut(data.rut);
        payloadToUpdate.rut = validatedRut;
    }

    const responsableExists = await prisma.responsable.findUnique({
        where: { id: idInt }
    });

    if (!responsableExists) {
        throw new NotFoundError("Este responsable no existe");
    }

    if (Object.keys(payloadToUpdate).length === 0) {
        return responsableExists;
    }

    if (payloadToUpdate.rut) {
        const duplicatedResponsable = await prisma.responsable.findFirst({
            where: { rut: payloadToUpdate.rut, NOT: { id: idInt } }
        });

        if (duplicatedResponsable) {
            throw new ConflictError("Este responsable ya existe");
        }
    }

    const responsable = await prisma.responsable.update({
        where: { id: idInt },
        data: payloadToUpdate,
    });
    return responsable;
}

export default {
    createResponsable,
    getAllResponsables,
    getResponsableById,
    updateResponsable,
}