import subclaseService from "../services/subclase.service.js";

// GET /api/subclase/
const findAll = async (req, res, next) => {
    try {
        const subclases = await subclaseService.getAllSubclases();
        res.status(200).json(subclases);
    } catch (error) {
        next(error);
    }
};

// GET /api/subclase/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const subclase = await subclaseService.getSubclaseById(id);
        res.status(200).json(subclase);
    } catch (error) {
        next(error);
    }
};

// POST /api/subclase/
const createOne = async (req, res, next) => {
    try {
        const newSubclase = await subclaseService.createSubclase(req.body);
        res.status(201).json(newSubclase);
    } catch (error) {
        next(error);
    }
};

// PUT /api/subclase/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedSubclase = await subclaseService.updateSubclase(id, req.body);
        res.status(200).json(updatedSubclase);
    } catch (error) {
        next(error);
    }
};

export default {
    findAll,
    findOneById,
    createOne,
    updateOne,
}