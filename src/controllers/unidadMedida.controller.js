import unidadMedidaService from "../services/unidadMedida.service.js";

// GET /api/unidadMedida/
const findAll = async (req, res, next) => {
    try {
        const unidadesMedida = await unidadMedidaService.getAllUnidadesMedida();
        res.status(200).json(unidadesMedida);
    } catch (error) {
        next(error);
    }
};

// GET /api/unidadMedida/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const unidadMedida = await unidadMedidaService.getUnidadMedidaById(id);
        res.status(200).json(unidadMedida);
    } catch (error) {
        next(error);
    }
};

// POST /api/unidadMedida
const createOne = async (req, res, next) => {
    try {
        const newUnidadMedida = await unidadMedidaService.createUnidadMedida(req.body);
        res.status(201).json(newUnidadMedida);
    } catch (error) {
        next(error);
    }
};

// PUT /api/unidadMedida/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUnidadMedida = await unidadMedidaService.updateUnidadMedida(id, req.body);
        res.status(200).json(updatedUnidadMedida);
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