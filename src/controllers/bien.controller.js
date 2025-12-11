import bienService from "../services/bien.service.js";


// GET /api/bien/
const findAll = async (req, res, next) => {
    try {
        const bienes = await bienService.getAllBienes();
        res.status(200).json(bienes);
    } catch (error) {
        next(error);
    }
};

// GET /api/grupo/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const bien = await bienService.getBienbyId(id);
        res.status(200).json(bien);
    } catch (error) {
        next(error);
    }
};

// POST /api/grupo/
const createOne = async (req, res, next) => {
    try {
        const newBien = await bienService.createBien(req.body);
        res.status(201).json(newBien);
    } catch (error) {
        next(error);
    }
};

// PUT /api/grupo/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateBien = await bienService.updateBien(id, req.body);
        res.status(200).json(updateBien);
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