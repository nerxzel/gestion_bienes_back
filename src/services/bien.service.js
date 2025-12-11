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

const nextCodInv = async () => {

    const lastCodInv = await prisma.bien.findFirst({
        orderBy: { id: 'desc'  }
    });

    if (!lastCodInv) {
        return "EX-0001"
    }

    const codInv = lastCodInv.codigoInventario.split("-")
    const stringPart = codInv[0]
    const numPart = codInv[1]
    const toInt = parseInt(numPart)
    const count = toInt + 1
    const stringCount = count.toString()
    const padded = stringCount.padStart(4, "0")
    const mixed = stringPart + ("-") + padded

    console.log("Está es la info de nextCodInv:", codInv)
    console.log("A ver cómo quedó:", mixed)

    return mixed

}

const createBien = async (data) => {
    const duplicatedBien = await prisma.bien.findFirst({
        where: { codigoInventario: data.codigoInventario }
    });

    if (duplicatedBien) {
        throw new ConflictError("Este bien ya existe");
    }

    const newBien = await prisma.bien.create({
        data: data
    });
    return newBien;

}

const updateBien = async (id, data) => {

}

export default {
    nextCodInv,
    createBien,
    getAllBienes,
    getBienbyId,
    updateBien,
}