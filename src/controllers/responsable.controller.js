import responsableService from "../services/responsable.service.js";

// GET /api/responsable
const findAllActives = async (req, res, next) => {
    try {
        const responsables = await responsableService.getAllActiveResponsables();
        res.status(200).json(responsables);
    } catch (error) {
        next(error);
    }
};

// GET /api/responsable/all
const findAll = async (req, res, next) => {
    try {
        const responsables = await responsableService.getAllResponsables();
        res.status(200).json(responsables);
    } catch (error) {
        next(error);
    }
};

// GET /api/responsable/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const responsable = await responsableService.getResponsableById(id);
        res.status(200).json(responsable);
    } catch (error) {
        next(error);
    }
};

// POST /api/responsable
const createOne = async (req, res, next) => {
    try {
        const newResponsable = await responsableService.createResponsable(req.body);
        res.status(201).json(newResponsable);
    } catch (error) {
        next(error);
    }
};

// PUT /api/responsable/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedResponsable = await responsableService.updateResponsable(id, req.body);
        res.status(200).json(updatedResponsable);
    } catch (error) {
        next(error);
    }
};

// DELETE /api/responsable/:id
const softDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await responsableService.softDeleteResponsable(id);
        res.status(200).json({ message: "Responsable eliminado correctamente" });
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