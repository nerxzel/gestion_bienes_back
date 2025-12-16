import { Router } from "express";
import responsableController from "../controllers/responsable.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { responsableSchemaCreate, responsableSchemaUpdate } from "../validators/responsable.schema.js";

const router = Router();

router.get("/", authenticateToken, responsableController.findAll);
router.get("/:id", authenticateToken, responsableController.findOneById);
router.post("/", authenticateToken, validateRequest(responsableSchemaCreate), responsableController.createOne);
router.put("/:id", authenticateToken, validateRequest(responsableSchemaUpdate), responsableController.updateOne);

export default router;