import claseService from "../services/clase.service.js";

// GET /api/clase
// GET /api/clase?dropdown=true for dropdowns
// GET /api/clase?grupoId=1 for clase by grupo
const findAll = async (req, res, next) => {
    try {
        const { grupoId, dropdown } = req.query;

        const clases = await claseService.getAllClases({
            grupoId: grupoId,
            dropdown: dropdown === 'true'
        });
        res.status(200).json(clases);
    } catch (error) {
        next(error);
    }
};

// GET /api/clase/grid
const getGrid = async (req, res, next) => {
    try {
        const gridClases = await claseService.getGridClases();
        res.status(200).json(gridClases)
    } catch (error) {
        next(error)
    }
}

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

export default {
    findAll,
    getGrid,
    findOneById,
    createOne,
    updateOne
}