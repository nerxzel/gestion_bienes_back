import prisma from "../config/prisma.js";
import { parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllModelos = async (params = {}) => {
    const { marcaId, dropdown } = params;

    const where = {};
    if (marcaId) {
        where.marcaId = parseInt(marcaId)
    }

    const select = dropdown ? {
        id: true,
        nombre: true,
    } : undefined;

    const modelos = await prisma.modelo.findMany({
        where: where,
        select: select,
        orderBy: { id: 'desc' }
    });
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
    const parentMarcaExists = await prisma.marca.findUnique({
        where: { id: data.marcaId }
    });
    if (!parentMarcaExists) {
        throw new NotFoundError("Esta marca no existe");
    }

    const duplicatedModelo = await prisma.modelo.findFirst({
        where: { nombre: data.nombre, marcaId: data.marcaId }
    });

    if (duplicatedModelo) {
        throw new ConflictError("Este modelo ya existe en esta marca");
    }

    const newModelo = await prisma.modelo.create({
        data: {
            nombre: data.nombre,
            marcaId: data.marcaId,
        }
    });
    return newModelo;
}

const updateModelo = async (id, data) => {
    const idInt = parseAndValidateId(id);

    const modeloExists = await prisma.modelo.findUnique({ where: { id: idInt } });
    if (!modeloExists) {
        throw new NotFoundError("Este modelo no existe");
    }

    if (Object.keys(data).length === 0) {
        return modeloExists;
    }

    if (data.marcaId) {
        const parentMarcaExists = await prisma.marca.findUnique({
            where: { id: data.marcaId }
        });
        if (!parentMarcaExists) {
            throw new NotFoundError("Esta marca no existe");
        }
    }

    if (data.nombre || data.marcaId) {
        const newNombre = data.nombre || modeloExists.nombre;
        const newMarcaId = data.marcaId || modeloExists.marcaId;

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
    }

    return await prisma.modelo.update({
        where: { id: idInt },
        data: data,
    });
}

export default {
    createModelo,
    getAllModelos,
    getModeloById,
    updateModelo,
}