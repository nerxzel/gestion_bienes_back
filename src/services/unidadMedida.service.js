import prisma from "../config/prisma.js";
import { parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllUnidadesMedida = async () => {
    const unidadesMedida = await prisma.unidadMedida.findMany();
    return unidadesMedida;
}

const getUnidadMedidaById = async (id) => {
    const idInt = parseAndValidateId(id);
    const unidadMedida = await prisma.unidadMedida.findUnique({
        where: { id: idInt }
    });

    if (!unidadMedida) {
        throw new NotFoundError("Esta unidad de medida no existe");
    }

    return unidadMedida;
}

const createUnidadMedida = async (data) => {
    const duplicatedUnidadMedida = await prisma.unidadMedida.findFirst({
        where: { nombre: data.nombre }
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
    const idInt = parseAndValidateId(id);

    const unidadMedidaExists = await prisma.unidadMedida.findUnique({
        where: { id: idInt }
    });

    if (!unidadMedidaExists) {
        throw new NotFoundError("Esta unidad de medida no existe");
    }

    const duplicatedUnidadMedida = await prisma.unidadMedida.findFirst({
        where: { nombre: data.nombre, NOT: { id: idInt } }
    })

    if (duplicatedUnidadMedida) {
        throw new ConflictError("Esta unidad de medida ya existe");
    }

    const unidadMedida = await prisma.unidadMedida.update({
        where: { id: idInt },
        data: {
            nombre: data.nombre,
        }
    });
    return unidadMedida;
}

export default {
    createUnidadMedida,
    getAllUnidadesMedida,
    getUnidadMedidaById,
    updateUnidadMedida,
}