import prisma from "../config/prisma.js";
import { parseAndValidateId } from "../utils/utility-methods.js";
import { NotFoundError, ConflictError } from "../utils/app-error.js"

const getAllBienes = async () => {
    const bienes = await prisma.bien.findMany({
        where: { isDeleted: false }
    });
    return bienes;
}

const getGridBienes = async () => {
    const bienes = await prisma.bien.findMany({
        where: { isDeleted: false },
        select: {
            codigoInventario: true,
            nombre: true,
            grupo: { select: { nombre: true } },
            clase: { select: { nombre: true } },
            subclase: { select: { nombre: true }},
            fechaIngreso: true,
            condicion: true,
            estado: true,
            ultimaDepreciacion: true,
            valor: true
        }, orderBy: { id: 'desc' }
    });

    const mapBienes = bienes.map(bien => ({
        codigoInventario: bien.codigoInventario,
        nombre: bien.nombre,
        grupo: bien.grupo?.nombre || "Sin grupo",
        clase: bien.clase?.nombre || "Sin clase",
        subclase: bien.subclase?.nombre || "Sin subclase",
        fechaIngreso: bien.fechaIngreso,
        condicion: bien.condicion,
        estado: bien.estado,
        ultimaDepreciacion: bien.ultimaDepreciacion,
        valor: bien.valor
    }))

    return mapBienes;
}

const getBienbyId = async (id) => {
    const idInt = parseAndValidateId(id)
    const bien = await prisma.bien.findUnique({
        where: { id: idInt }
    });

    if (!bien || bien.isDeleted) {
        throw new NotFoundError("Este bien no existe o fue eliminado");
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
    const toInt = parseInt(numPart) + 1
    const stringCount = toInt.toString()
    const padded = stringCount.padStart(4, "0")
    const newCodInv = stringPart + ("-") + padded

    return newCodInv

}

const createBien = async (data) => {
    const newCodigoInventario = await nextCodInv()
    const initialCost = data.costoAdquisicion

    const duplicatedBien = await prisma.bien.findFirst({
        where: { codigoInventario: newCodigoInventario }
    });

    if (duplicatedBien) {
        throw new ConflictError("Este bien ya existe");
    }

    const newBien = await prisma.bien.create({
       data: {
        ...data,
        codigoInventario: newCodigoInventario,
        valor: initialCost
       }
    });
    return newBien;
}

const updateBien = async (id, data) => {
    const idInt = parseAndValidateId(id)

    const bienExist = await prisma.bien.findUnique({
        where: {id: idInt}
    })

    if (!bienExist) {
        throw new NotFoundError("Este bien no existe")  
    }

    const updatedBien = await prisma.bien.update({
        where: {id: idInt},
        data: data
    }); 
    return updatedBien
}

const softDeleteBien = async (id) => {
    const idInt = parseAndValidateId(id)

    const bienExist = await prisma.bien.findUnique({
        where: {id: idInt }
    })

    if (!bienExist) {
        throw new NotFoundError("Este bien no existe")
    }

    const sofDeletedBien = await prisma.bien.update({
        where: { id: idInt },
        data: {isDeleted: true}
    });

    return sofDeletedBien;
}

const hardDeleteBien = async (id) => {
    const idInt = parseAndValidateId(id);

    const bienExist = await prisma.bien.findUnique({
        where: { id: idInt }
    });

    if (!bienExist) {
        throw new NotFoundError("Este bien no existe");
    }

    const deletedBien = await prisma.bien.delete({
        where: { id: idInt }
    });

    return deletedBien;
}

export default {
    nextCodInv,
    createBien,
    getAllBienes,
    getGridBienes,
    getBienbyId,
    updateBien,
    softDeleteBien,
    hardDeleteBien,
}