import marcaService from "../services/marca.service.js";

// GET /api/marca/
const findAllActives = async (req, res, next) => {
    try {
        const marcas = await marcaService.getAllActiveMarcas();
        res.status(200).json(marcas);
    } catch (error) {
        next(error);
    }
};

// GET /api/marca/all
const findAll = async (req, res, next) => {
    try {
        const marcas = await marcaService.getAllMarcas();
        res.status(200).json(marcas);
    } catch (error) {
        next(error);
    }
};

// GET /api/marca/:id
const findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const marca = await marcaService.getMarcaById(id);
        res.status(200).json(marca);
    } catch (error) {
        next(error);
    }
};

// POST /api/marca/
const createOne = async (req, res, next) => {
    try {
        const newMarca = await marcaService.createMarca(req.body);
        res.status(201).json(newMarca);
    } catch (error) {
        next(error);
    }
};

// PUT /api/marca/:id
const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedMarca = await marcaService.updateMarca(id, req.body);
        res.status(200).json(updatedMarca);
    } catch (error) {
        next(error);
    }
};

// DELETE /api/marca/:id
const softDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await marcaService.softDeleteMarca(id);
        res.status(200).json({ message: "Marca eliminada correctamente" });
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