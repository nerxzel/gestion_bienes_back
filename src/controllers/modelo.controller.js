import modeloService from "../services/modelo.service.js";

// GET /api/modelo/
const findAll = async (req, res, next) => {
    try {
        const modelos = await modeloService.getAllModelos();
        res.status(200).json(modelos);
    } catch (error) {
        next(error);
    }
};

// GET /api/modelo/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const modelo = await modeloService.getModeloById(id);
        res.status(200).json(modelo);
    } catch (error) {
        next(error);
    }
};

// POST /api/modelo/
const createOne = async (req, res, next) => {
    try {
        const newModelo = await modeloService.createModelo(req.body);
        res.status(201).json(newModelo);
    } catch (error) {
        next(error);
    }
};

// PUT /api/modelo/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedModelo = await modeloService.updateModelo(id, req.body);
        res.status(200).json(updatedModelo);
    } catch (error) {
        next(error);
    }
};

export default {
    findAll,
    findOneById,
    createOne,
    updateOne
}