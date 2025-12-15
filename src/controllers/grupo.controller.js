import grupoService from "../services/grupo.service.js";


// GET /api/grupo/all
const findAll = async (req, res, next) => {
    try {
        const { dropdown } = req.query;

        const grupos = await grupoService.getAllGrupos({
            dropdown: dropdown === 'true'
        });
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


export default {
    findAll,
    findOneById,
    createOne,
    updateOne,
}