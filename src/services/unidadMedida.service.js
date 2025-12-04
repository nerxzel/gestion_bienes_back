import prisma from "../config/prisma.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllUnidadMedidas = async () => {
    const unidadMedidas = await prisma.unidadMedida.findMany();
    return unidadMedidas;
}

const getAllActiveUnidadMedidas = async () => {
    const unidadMedidas = await prisma.unidadMedida.findMany({
        where: { isDeleted: false }
    });
    return unidadMedidas;
}

const getUnidadMedidaById = async (id) => {
    const unidadMedida = await prisma.unidadMedida.findUnique({
        where: { id: parseInt(id) }
    });

    if (!unidadMedida || unidadMedida.isDeleted) {
        throw new NotFoundError("Esta unidad de medida no existe o ya fue eliminada");
    }

    return unidadMedida;
}

const createUnidadMedida = async (data) => {

    const duplicatedUnidadMedida = await prisma.unidadMedida.findFirst({
        where: { nombre: data.nombre, isDeleted: false }
    });

    if (duplicatedUnidadMedida) {
        throw new ConflictError("Esta unidad de medida ya existe");
    }

    const newUnidadMedida = await prisma.unidadMedida.create({
        data: {
            nombre: data.nombre,
        }
    });
    return newUnidadMedida;
}

const updateUnidadMedida = async (id, data) => {
    const idInt = parseInt(id);

    const unidadMedidaExists = await prisma.unidadMedida.findUnique({
        where: { id: idInt }
    });

    if (!unidadMedidaExists || unidadMedidaExists.isDeleted) {
        throw new NotFoundError("Esta unidad de medida no existe o ya fue eliminada");
    }

    const unidadMedida = await prisma.unidadMedida.update({
        where: { id: parseInt(id) },
        data: {
            nombre: data.nombre,
        }
    });
    return unidadMedida;
}

// Not sure if this will be implemented in the future
const softDeleteUnidadMedida = async (id) => {
    const idInt = parseInt(id);

    const unidadMedidaExists = await prisma.unidadMedida.findUnique({
        where: { id: idInt }
    });
    if (!unidadMedidaExists || unidadMedidaExists.isDeleted) {
        throw new NotFoundError("Esta unidad de medida no existe o ya fue eliminada");
    }

    const relatedBien = await prisma.bien.count({
        where: { unidadMedidaId: idInt, isDeleted: false }
    });
    if (relatedBien > 0) {
        throw new ConflictError("Esta unidad de medida tiene bienes asociados activos");
    }

    const deletedUnidadMedida = await prisma.unidadMedida.update({
        where: { id: idInt },
        data: { isDeleted: true }
    });

    return deletedUnidadMedida;
}

export default {
    createUnidadMedida,
    getAllUnidadMedidas,
    getAllActiveUnidadMedidas,
    getUnidadMedidaById,
    updateUnidadMedida,
    softDeleteUnidadMedida
}