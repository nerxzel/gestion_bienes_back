import { Router } from "express";
import modeloController from "../controllers/modelo.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { modeloSchemaCreate, modeloSchemaUpdate } from "../validators/modelo.schema.js";

const router = Router();

router.get("/", authenticateToken, modeloController.findAll);
router.get("/grid", authenticateToken, modeloController.getGrid);
router.get("/:id", authenticateToken, modeloController.findOneById);
router.post("/", authenticateToken, validateRequest(modeloSchemaCreate), modeloController.createOne);
router.put("/:id", authenticateToken, validateRequest(modeloSchemaUpdate), modeloController.updateOne);

export default router;