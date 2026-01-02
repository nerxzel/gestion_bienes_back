import prisma from "../config/prisma.js";
import ExcelJS from 'exceljs';
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
            id: true,
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
        id: bien.id,
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

const nextResolucion = async () => {
    const lastResolucion = await prisma.bien.findFirst({
        where: { nroResolucion: { not: null } },
        orderBy: { nroResolucion: 'desc'  }
    });

    if (!lastResolucion) {
        return "001"
    }

    const currentResolucion = parseInt(lastResolucion.nroResolucion, 10);
    const sum = currentResolucion + 1;
    const newResolucion = sum.toString().padStart(3, "0");

    return newResolucion
}

const altaBien = async (id, data) => {
    const newResolucion = await nextResolucion()
    const currentDate = new Date();
    const idInt = parseAndValidateId(id)

    const bienExists = await prisma.bien.findUnique({
        where: { id: idInt }
    })

    console.log("Mira, esta fecha:",currentDate)

    if (!bienExists) {
        throw new NotFoundError("Este bien no existe")
    } 

    const altaBien = await prisma.bien.update({
        where: {id: idInt},
        data: {
            ...data,
            nroResolucion: newResolucion,
            fechaResolucion: currentDate,
            condicion: "Alta"
        },
    })

    return altaBien
}

const bajaBien = async (id, data) => {
    const newResolucion = await nextResolucion()
    const currentDate = new Date();
    const idInt = parseAndValidateId(id)

    const bienExists = await prisma.bien.findUnique({
        where: { id: idInt }
    })

    if (!bienExists) {
        throw new NotFoundError("Este bien no existe")
    } 

    const bajaBien = await prisma.bien.update({
        where: {id: idInt},
        data: {
            ...data,
            nroResolucion: newResolucion,
            fechaResolucion: currentDate,
            condicion: "Baja"
        },
    })

    return bajaBien
}

const depreciarBien = async (id, data) => {
    const idInt = parseAndValidateId(id);

    const depreciationData = await prisma.bien.findUnique({
        where: { id: idInt},
        select: { grupo: { select: { vidaUtil: true}},
        costoAdquisicion: true, 
        valorResidual: true,
        fechaIngreso: true,
        },
    });

    const { grupo, costoAdquisicion, valorResidual, fechaIngreso} = depreciationData
    const vidaUtilAnhos = grupo.vidaUtil
    const vidaUtilMeses = vidaUtilAnhos * 12

    const currentDate = new Date()
    const fechaIngresoCalc = new Date(fechaIngreso)

    let months = (currentDate.getFullYear() - fechaIngresoCalc.getFullYear()) * 12;
    months -= fechaIngresoCalc.getMonth();
    months += currentDate.getMonth();

    if (months < 0) months = 0;

    const effectiveMonths = Math.min(months, vidaUtilMeses)

    const depreciacion = costoAdquisicion - valorResidual;
    const depreciacionAcumulada = (depreciacion / vidaUtilMeses) * effectiveMonths;

    let newValue = costoAdquisicion - depreciacionAcumulada;

    newValue = Math.round(newValue)

    if (newValue < valorResidual) {
        newValue = valorResidual; 
    }

    const depreciatedBien = await prisma.bien.update({
        where: { id: idInt },
        data: {
            valor: newValue,
            ultimaDepreciacion: currentDate
        }
    });
 
    return depreciatedBien;

}

const depreciarBienes = async () => {
    const bienes = await getAllBienes();
    
    const promises = bienes.map(bien => depreciarBien(bien.id))

    const results = await Promise.all(promises)

    return results
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

const bienesExcel = async () => {

    const bienes = await prisma.bien.findMany({ 
        include: {
            unidadMedida: true,
            responsable: true,
            ubicacion: true,
            marca: true,
            modelo: true,
            grupo: true,
            clase: true,
            subclase: true
        },
        orderBy: { id: 'asc' }
    });

    const plainBienes = bienes.map(bien => ({
        id: bien.id,
        codigoInventario: bien.codigoInventario,
        nombre: bien.nombre,
        descripcionLarga: bien.descripcionLarga,
        tipoObjeto: bien.tipoObjeto,
        condicion: bien.condicion,
        numSerie: bien.numSerie || "Sin Info",
        color: bien.color,
        cantidadPieza: bien.cantidadPieza,
        unidadMedida: bien.unidadMedida.nombre,
        largo: bien.largo || "Sin Info",
        alto: bien.alto || "Sin Info",
        ancho: bien.ancho || "Sin Info",
        responsable: bien.responsable.rut,
        ubicacion: bien.ubicacion.nombre,
        marca: bien.marca.nombre,
        modelo: bien.modelo.nombre,
        grupo: bien.grupo.nombre,
        clase: bien.clase.nombre,
        subclase: bien.subclase.nombre,
        isDeleted: bien.isDeleted,
        valor: bien.valor,
        costoAdquisicion: bien.costoAdquisicion,
        valorResidual: bien.valorResidual,
        ultimaDepreciacion: bien.ultimaDepreciacion,
        isla: bien.isla || "Sin Info",
        fila: bien.fila || "Sin Info",
        columna: bien.columna || "Sin Info",
        estado: bien.estado
    }))

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte general bienes');

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 25 },
    { header: 'Código Inventario', key: 'codigoInventario', width: 30 },
    { header: 'Descripción corta', key: 'nombre', width: 30 },
    { header: 'Descripción larga', key: 'descripcionLarga', width: 20 },
    { header: 'Tipo Objeto', key: 'tipoObjeto', width: 15 },
    { header: 'Condicion', key: 'condicion', width: 15 },
    { header: 'Numero de Serie', key: 'numSerie', width: 15 },
    { header: 'Color', key: 'color', width: 15 },
    { header: 'Cantidad Piezas', key: 'cantidadPieza', width: 15 },
    { header: 'Unidad de Medida', key: 'unidadMedida', width: 15 },
    { header: 'Largo', key: 'largo', width: 15 },
    { header: 'Alto', key: 'alto', width: 15 },
    { header: 'Ancho', key: 'ancho', width: 15 },
    { header: 'Responsable RUT', key: 'responsable', width: 15 },
    { header: 'Ubicacion', key: 'ubicacion', width: 15 },
    { header: 'Marca', key: 'marca', width: 15 },
    { header: 'Modelo', key: 'modelo', width: 15 },
    { header: 'Grupo', key: 'grupo', width: 15 },
    { header: 'Clase', key: 'clase', width: 15 },
    { header: 'Subclase', key: 'subclase', width: 15 },
    { header: 'Eliminado', key: 'isDeleted', width: 15 },
    { header: 'Valor', key: 'valor', width: 15 },
    { header: 'Costo Adquisicion', key: 'costoAdquisicion', width: 15 },
    { header: 'Valor Residual', key: 'valorResidual', width: 15 },
    { header: 'Ultima depreciacion', key: 'ultimaDepreciacion', width: 15 },
    { header: 'Isla', key: 'isla', width: 15 },
    { header: 'Fila', key: 'fila', width: 15 },
    { header: 'Columna', key: 'columna', width: 15 },
    { header: 'Estado', key: 'estado', width: 15 },
  ];

  worksheet.getRow(1).font = { bold: true };

  worksheet.addRows(plainBienes);

  return await workbook.xlsx.writeBuffer();
}; 

const hojaMural = async (id) => {
    const responsableId = parseAndValidateId(id);

    const responsable = await prisma.bien.findMany({
        where: {responsableId: responsableId},
        include: {
            responsable: true 
        },
        orderBy: { id: 'asc' }
    })

    const plainDatos = responsable.map(bien => ({
        codigoInventario: bien.codigoInventario,
        nombre: bien.nombre,
        descripcionLarga: bien.descripcionLarga,
        condicion: bien.condicion,
        cantidadPieza: bien.cantidadPieza,
        responsable: bien.responsable.rut,
        estado: bien.estado
    }))

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Hoja_Mural_${responsableId}`);

     worksheet.columns = [
    { header: 'Código Inventario', key: 'codigoInventario', width: 30 },
    { header: 'Descripción corta', key: 'nombre', width: 30 },
    { header: 'Descripción larga', key: 'descripcionLarga', width: 20 },
    { header: 'Condicion', key: 'condicion', width: 15 },
    { header: 'Cantidad Piezas', key: 'cantidadPieza', width: 15 },
    { header: 'Responsable RUT', key: 'responsable', width: 15 },
    { header: 'Estado', key: 'estado', width: 15 },
  ];

    worksheet.getRow(1).font = { bold: true };

    worksheet.addRows(plainDatos);

    return await workbook.xlsx.writeBuffer();

}

export default {
    nextCodInv,
    createBien,
    getAllBienes,
    getGridBienes,
    getBienbyId,
    updateBien,
    altaBien,
    bajaBien,
    depreciarBien,
    depreciarBienes,
    softDeleteBien,
    hardDeleteBien,
    bienesExcel,
    hojaMural,
}