import { Router } from "express";
import responsableController from "../controllers/responsable.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import { responsableSchemaCreate, responsableSchemaUpdate } from "../validators/responsable.schema.js";

const router = Router();

router.get("/", responsableController.findAll);
router.get("/:id", responsableController.findOneById);
router.post("/", validateRequest(responsableSchemaCreate), responsableController.createOne);
router.put("/:id", validateRequest(responsableSchemaUpdate), responsableController.updateOne);

export default router;