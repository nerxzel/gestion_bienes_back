import ubicacionService from "../services/ubicacion.service.js";

// GET /api/ubicacion/
const findAllActives = async (req, res, next) => {
    try {
        const ubicaciones = await ubicacionService.getAllActiveUbicaciones();
        res.status(200).json(ubicaciones);
    } catch (error) {
        next(error);
    }
};

// GET /api/ubicacion/all
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

// DELETE /api/ubicacion/:id
const softDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await ubicacionService.softDeleteUbicacion(id);
        res.status(200).json({ message: "Ubicacion eliminada correctamente" });
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