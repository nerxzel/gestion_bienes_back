import bienService from "../services/bien.service.js";


// GET /api/bien/test
const test = async (req, res, next) => {
    try {
        const test = await bienService.nextCodInv();
        res.status(200).json(test)
    } catch {
        return "Error"
    }
}

// GET /api/bien/
const findAll = async (req, res, next) => {
    try {
        const bienes = await bienService.getAllBienes();
        res.status(200).json(bienes);
    } catch (error) {
        next(error);
    }
};

// GET /api/bien/grid
const getGrid = async (req, res, next) => {
    try {
        const gridBienes = await bienService.getGridBienes();
        res.status(200).json(gridBienes)
    } catch (error) {
        next(error)
    }
}

// GET /api/bien/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const bien = await bienService.getBienbyId(id);
        res.status(200).json(bien);
    } catch (error) {
        next(error);
    }
};

// POST /api/bien/
const createOne = async (req, res, next) => {
    try {
        const newBien = await bienService.createBien(req.body);
        res.status(201).json(newBien);
    } catch (error) {
        next(error);
    }
};

// PUT /api/bien/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateBien = await bienService.updateBien(id, req.body);
        res.status(200).json(updateBien);
        
    } catch (error) {
        next(error);
    }
};

// PUT /api/bien/alta/:id
const alta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const altaBien = await bienService.altaBien(id, req.body);
        const response = { "condicion" : altaBien.condicion, "nroResolucion" : altaBien.nroResolucion, "fechaResolucion" : altaBien.fechaResolucion}
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// PUT /api/bien/baja/id
const baja = async (req, res, next) => {
    try {
        const { id } = req.params;
        const bajaBien = await bienService.bajaBien(id, req.body);
        const response = { "condicion" : bajaBien.condicion, "nroResolucion" : bajaBien.nroResolucion, "fechaResolucion" : bajaBien.fechaResolucion}
        res.status(200).json(response);
        console.log("2:", req.body)
    } catch (error) {
        next(error);
    }
}

// PUT /api/bien/depreciar
const depreciarTodos = async (req, res, next) => {
    try {
        const depreciatedBienes = await bienService.depreciarBienes();
        
        res.status(200).json({
            message: "¡Depreciación masiva lista!",
            bienesAfectados: depreciatedBienes.lenght,
        }) 
    } catch (error) {
        next(error);
    }
}

// POST /api/bien/:id
const softDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const softDeletedBien = await bienService.softDeleteBien(id)
        res.status(200).json(softDeletedBien);
    } catch (error) {
        next(error);
    }
};

// DELETE /api/bien/hardDelete/:id
const hardDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const hardDeletedBien = await bienService.hardDeleteBien(id)
        res.status(200).json(hardDeletedBien);
    } catch (error) {
        next(error);
    }
};

export default {
    test,
    findAll,
    getGrid,
    findOneById,
    createOne,
    updateOne,
    alta,
    baja,
    depreciarTodos,
    softDelete,
    hardDelete,
}