import { Router } from "express";
import grupoController from "../controllers/grupo.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { grupoSchemaCreate, grupoSchemaUpdate } from "../validators/grupo.schema.js";


const router = Router();

router.get("/", authenticateToken, grupoController.findAll);
router.get("/:id", authenticateToken, grupoController.findOneById);
router.post("/", authenticateToken, validateRequest(grupoSchemaCreate), grupoController.createOne);
router.put("/:id", authenticateToken, validateRequest(grupoSchemaUpdate), grupoController.updateOne);

export default router;