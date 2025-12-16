import { Router } from "express";
import unidadMedidaController from "../controllers/unidadMedida.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { unidadMedidaSchemaCreate, unidadMedidaSchemaUpdate } from "../validators/unidadMedida.schema.js";

const router = Router();

router.get("/", authenticateToken, unidadMedidaController.findAll);
router.get("/:id", authenticateToken, unidadMedidaController.findOneById);
router.post("/", authenticateToken, validateRequest(unidadMedidaSchemaCreate), unidadMedidaController.createOne);
router.put("/:id", authenticateToken, validateRequest(unidadMedidaSchemaUpdate), unidadMedidaController.updateOne);

export default router;