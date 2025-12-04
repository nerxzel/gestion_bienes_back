import prisma from "../config/prisma.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllMarcas = async () => {
    const marcas = await prisma.marca.findMany();
    return marcas;
}

const getAllActiveMarcas = async () => {
    const marcas = await prisma.marca.findMany({
        where: { isDeleted: false }
    });
    return marcas;
}

const getMarcaById = async (id) => {
    const marca = await prisma.marca.findUnique({
        where: { id: parseInt(id) }
    });

    if (!marca || marca.isDeleted) {
        throw new NotFoundError("Esta marca no existe o ya fue eliminada");
    }

    return marca;
}

const createMarca = async (data) => {

    const duplicatedMarca = await prisma.marca.findFirst({
        where: { nombre: data.nombre, isDeleted: false }
    });

    if (duplicatedMarca) {
        throw new ConflictError("Esta marca ya existe");
    }

    const newMarca = await prisma.marca.create({
        data: {
            nombre: data.nombre,
        }
    });
    return newMarca;
}

const updateMarca = async (id, data) => {
    const idInt = parseInt(id);

    const marcaExists = await prisma.marca.findUnique({
        where: { id: idInt }
    });

    if (!marcaExists || marcaExists.isDeleted) {
        throw new NotFoundError("Esta marca no existe o ya fue eliminada");
    }

    const marca = await prisma.marca.update({
        where: { id: parseInt(id) },
        data: {
            nombre: data.nombre,
        }
    });
    return marca;
}

// Not sure if this will be implemented in the future
const softDeleteMarca = async (id) => {
    const idInt = parseInt(id);

    const marcaExists = await prisma.marca.findUnique({
        where: { id: idInt }
    });
    if (!marcaExists || marcaExists.isDeleted) {
        throw new NotFoundError("Esta marca no existe o ya fue eliminada");
    }

    const relatedBien = await prisma.bien.count({
        where: { marcaId: idInt, isDeleted: false }
    });
    if (relatedBien > 0) {
        throw new ConflictError("Esta marca tiene bienes asociados activos");
    }

    const deletedMarca = await prisma.marca.update({
        where: { id: idInt },
        data: { isDeleted: true }
    });

    return deletedMarca;
}

export default {
    createMarca,
    getAllMarcas,
    getAllActiveMarcas,
    getMarcaById,
    updateMarca,
    softDeleteMarca
}