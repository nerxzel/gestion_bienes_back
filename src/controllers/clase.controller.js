import claseService from "../services/clase.service.js";

// GET /api/clase/
const findAllActives = async (req, res, next) => {
    try {
        const clases = await claseService.getAllActiveClases();
        res.status(200).json(clases);
    } catch (error) {
        next(error);
    }
};

// GET /api/clase/all
const findAll = async (req, res, next) => {
    try {
        const clases = await claseService.getAllClases();
        res.status(200).json(clases);
    } catch (error) {
        next(error);
    }
};

// GET /api/clase/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const clase = await claseService.getClaseById(id);
        res.status(200).json(clase);
    } catch (error) {
        next(error);
    }
};

// POST /api/clase/
const createOne = async (req, res, next) => {
    try {
        const newClase = await claseService.createClase(req.body);
        res.status(201).json(newClase);
    } catch (error) {
        next(error);
    }
};

// PUT /api/clase/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedClase = await claseService.updateClase(id, req.body);
        res.status(200).json(updatedClase);
    } catch (error) {
        next(error);
    }
};

// DELETE /api/clase/:id
const softDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await claseService.softDeleteClase(id);
        res.status(200).json({ message: "Clase eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};

export default {
    findAllActives,
    findAll,
    findOneById,
    createOne,
    updateOne,
    softDelete
}