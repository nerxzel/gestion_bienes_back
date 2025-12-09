import prisma from "../config/prisma.js";
import { trimAndCapitalize, parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllMarcas = async () => {
    const marcas = await prisma.marca.findMany();
    return marcas;
}

const getMarcaById = async (id) => {
    const idInt = parseAndValidateId(id);
    const marca = await prisma.marca.findUnique({
        where: { id: idInt }
    });

    if (!marca) {
        throw new NotFoundError("Esta marca no existe");
    }

    return marca;
}

const createMarca = async (data) => {
    if (!data.nombre) {
        throw new BadRequestError("El nombre es obligatorio");
    }

    const normalizedNombre = trimAndCapitalize(data.nombre);

    const duplicatedMarca = await prisma.marca.findFirst({
        where: { nombre: normalizedNombre }
    });

    if (duplicatedMarca) {
        throw new ConflictError("Esta marca ya existe");
    }

    const newMarca = await prisma.marca.create({
        data: {
            nombre: normalizedNombre,
        }
    });
    return newMarca;
}

const updateMarca = async (id, data) => {
    const idInt = parseAndValidateId(id);
    const normalizedNombre = trimAndCapitalize(data.nombre);

    const marcaExists = await prisma.marca.findUnique({
        where: { id: idInt }
    });

    if (!marcaExists) {
        throw new NotFoundError("Esta marca no existe");
    }

    const duplicatedMarca = await prisma.marca.findFirst({
        where: { nombre: normalizedNombre, NOT: { id: idInt } }
    });

    if (duplicatedMarca) {
        throw new ConflictError("Esta marca ya existe");
    }

    const marca = await prisma.marca.update({
        where: { id: parseInt(id) },
        data: {
            nombre: normalizedNombre,
        }
    });
    return marca;
}

export default {
    createMarca,
    getAllMarcas,
    getMarcaById,
    updateMarca,
}