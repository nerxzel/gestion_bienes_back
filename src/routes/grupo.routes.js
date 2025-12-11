import { Router } from "express";
import grupoController from "../controllers/grupo.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import { grupoSchemaCreate, grupoSchemaUpdate } from "../validators/grupo.schema.js";


const router = Router();

router.get("/", grupoController.findAll);
router.get("/:id", grupoController.findOneById);
router.post("/", validateRequest(grupoSchemaCreate), grupoController.createOne);
router.put("/:id", validateRequest(grupoSchemaUpdate), grupoController.updateOne);

export default router;