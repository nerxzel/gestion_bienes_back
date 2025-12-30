import subclaseService from "../services/subclase.service.js";

// GET /api/subclase
// GET /api/subclase?dropdown=true for dropdowns
// GET /api/subclase?claseId=1 for subclase by clase
const findAll = async (req, res, next) => {
    try {
        const { claseId, dropdown } = req.query;

        const subclases = await subclaseService.getAllSubclases({
            claseId: claseId,
            dropdown: dropdown === 'true'
        });
        res.status(200).json(subclases);
    } catch (error) {
        next(error);
    }
};

// GET /api/subclase/grid
const getGrid = async (req, res, next) => {
    try {
        const gridSubclases = await subclaseService.getGridSubclases();
        res.status(200).json(gridSubclases)
    } catch (error) {
        next(error)
    }
}

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
    getGrid,
    findOneById,
    createOne,
    updateOne,
}