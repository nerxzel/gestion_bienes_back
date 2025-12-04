import grupoService from "../services/grupo.service.js";

// GET /api/grupo/
const findAllActives = async (req, res, next) => {
    try {
        const grupos = await grupoService.getAllActiveGrupo();
        res.status(200).json(grupos);
    } catch (error) {
        next(error);
    }
};

// GET /api/grupo/all
const findAll = async (req, res, next) => {
    try {
        const grupos = await grupoService.getAllGrupo();
        res.status(200).json(grupos);
    } catch (error) {
        next(error);
    }
};

// GET /api/grupo/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const grupo = await grupoService.getGrupoById(id);
        res.status(200).json(grupo);
    } catch (error) {
        next(error);
    }
};

// POST /api/grupo/
const createOne = async (req, res, next) => {
    try {
        const newGrupo = await grupoService.createGrupo(req.body);
        res.status(201).json(newGrupo);
    } catch (error) {
        next(error);
    }
};

// PUT /api/grupo/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedGrupo = await grupoService.updateGrupo(id, req.body);
        res.status(200).json(updatedGrupo);
    } catch (error) {
        next(error);
    }
};

// DELETE /api/grupo/:id
const softDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await grupoService.softDeleteGrupo(id);
        res.status(200).json({ message: "Grupo eliminado correctamente" });
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