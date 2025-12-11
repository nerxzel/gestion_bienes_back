import prisma from "../config/prisma.js";
import { parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllBienes = async () => {
    const bienes = await prisma.bien.findMany();
    return bienes;
}

const getBienbyId = async (id) => {
    const idInt = parseInt(id)
    const bien = await prisma.bien.findUnique({
        where: { id: idInt }
    });

    if (!bien) {
        throw new NotFoundError("Este bien no existe");
    }

    return bien;
}

const createBien = async (data) => {

}

const updateBien = async (id, data) => {

}

export default {
    createBien,
    getAllBienes,
    getBienbyId,
    updateBien,
}