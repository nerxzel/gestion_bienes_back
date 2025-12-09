import ubicacionService from "../services/ubicacion.service.js";

// GET /api/ubicacion/
const findAll = async (req, res, next) => {
    try {
        const ubicaciones = await ubicacionService.getAllUbicaciones();
        res.status(200).json(ubicaciones);
    } catch (error) {
        next(error);
    }
};

// GET /api/ubicacion/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const ubicacion = await ubicacionService.getUbicacionById(id);
        res.status(200).json(ubicacion);
    } catch (error) {
        next(error);
    }
};

// POST /api/ubicacion/
const createOne = async (req, res, next) => {
    try {
        const newUbicacion = await ubicacionService.createUbicacion(req.body);
        res.status(201).json(newUbicacion);
    } catch (error) {
        next(error);
    }
};

// PUT /api/ubicacion/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUbicacion = await ubicacionService.updateUbicacion(id, req.body);
        res.status(200).json(updatedUbicacion);
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