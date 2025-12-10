import { Router } from "express";
import ubicacionController from "../controllers/ubicacion.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import { ubicacionSchemaCreate, ubicacionSchemaUpdate } from "../validators/ubicacion.schema.js";

const router = Router();

router.get("/", ubicacionController.findAll);
router.get("/:id", ubicacionController.findOneById);
router.post("/", validateRequest(ubicacionSchemaCreate), ubicacionController.createOne);
router.put("/:id", validateRequest(ubicacionSchemaUpdate), ubicacionController.updateOne);

export default router;