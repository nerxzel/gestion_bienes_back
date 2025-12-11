import { Router } from "express";
import unidadMedidaController from "../controllers/unidadMedida.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import { unidadMedidaSchemaCreate, unidadMedidaSchemaUpdate } from "../validators/unidadMedida.schema.js";

const router = Router();

router.get("/", unidadMedidaController.findAll);
router.get("/:id", unidadMedidaController.findOneById);
router.post("/", validateRequest(unidadMedidaSchemaCreate), unidadMedidaController.createOne);
router.put("/:id", validateRequest(unidadMedidaSchemaUpdate), unidadMedidaController.updateOne);

export default router;