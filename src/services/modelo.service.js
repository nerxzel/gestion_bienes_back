import prisma from "../config/prisma.js";
import { parseAndValidateId, trimAndCapitalize } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllModelos = async () => {
    const modelos = await prisma.modelo.findMany();
    return modelos;
}

const getModeloById = async (id) => {
    const idInt = parseAndValidateId(id);
    const modelo = await prisma.modelo.findUnique({
        where: { id: idInt }
    });

    if (!modelo) {
        throw new NotFoundError("Este modelo no existe");
    }

    return modelo;
}

const createModelo = async (data) => {
    if (!data.nombre) {
        throw new BadRequestError("El nombre es obligatorio");
    }

    if (!data.marcaId) {
        throw new BadRequestError("La marca es obligatoria");
    }

    const capitalizedNombre = trimAndCapitalize(data.nombre);
    const marcaIdInt = parseInt(data.marcaId);

    const parentMarcaExists = await prisma.marca.findUnique({
        where: { id: marcaIdInt }
    });
    if (!parentMarcaExists) {
        throw new NotFoundError("Esta marca no existe");
    }

    const duplicatedModelo = await prisma.modelo.findFirst({
        where: { nombre: capitalizedNombre, marcaId: marcaIdInt }
    });

    if (duplicatedModelo) {
        throw new ConflictError("Este modelo ya existe en esta marca");
    }

    const newModelo = await prisma.modelo.create({
        data: {
            nombre: capitalizedNombre,
            marcaId: marcaIdInt,
        }
    });
    return newModelo;
}

const updateModelo = async (id, data) => {
    const idInt = parseAndValidateId(id);
    const payloadToUpdate = {};

    if (data.nombre) {
        const capitalizedNombre = trimAndCapitalize(data.nombre);
        payloadToUpdate.nombre = capitalizedNombre;
    }

    if (data.marcaId) {
        const marcaIdInt = parseAndValidateId(data.marcaId)
        payloadToUpdate.marcaId = marcaIdInt;

        const parentMarcaExists = await prisma.marca.findUnique({
            where: { id: marcaIdInt }
        });
        if (!parentMarcaExists) {
            throw new NotFoundError("Esta marca no existe");
        }
    }

    const modeloExists = await prisma.modelo.findUnique({
        where: { id: idInt }
    });

    if (!modeloExists) {
        throw new NotFoundError("Este modelo no existe");
    }

    if (Object.keys(payloadToUpdate).length !== 0) {
        const newNombre = payloadToUpdate.nombre || modeloExists.nombre;
        const newMarcaId = payloadToUpdate.marcaId || modeloExists.marcaId;

        const duplicatedModelo = await prisma.modelo.findFirst({
            where: {
                nombre: newNombre,
                marcaId: newMarcaId,
                NOT: { id: idInt },
            }
        });

        if (duplicatedModelo) {
            throw new ConflictError("Este modelo ya existe en esta marca");
        }

        const updatedModelo = await prisma.modelo.update({
            where: { id: idInt },
            data: payloadToUpdate,
        });
        return updatedModelo;
    }

    return modeloExists;
}

export default {
    createModelo,
    getAllModelos,
    getModeloById,
    updateModelo,
}