import { Router } from "express";
import ubicacionController from "../controllers/ubicacion.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { ubicacionSchemaCreate, ubicacionSchemaUpdate } from "../validators/ubicacion.schema.js";

const router = Router();

router.get("/", authenticateToken, ubicacionController.findAll);
router.get("/:id", authenticateToken, ubicacionController.findOneById);
router.post("/", authenticateToken, validateRequest(ubicacionSchemaCreate), ubicacionController.createOne);
router.put("/:id", authenticateToken, validateRequest(ubicacionSchemaUpdate), ubicacionController.updateOne);

export default router;