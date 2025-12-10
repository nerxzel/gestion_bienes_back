import { Router } from "express";
import subclaseController from "../controllers/subclase.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import { subclaseSchemaCreate, subclaseSchemaUpdate } from "../validators/subclase.schema.js";

const router = Router();

router.get("/", subclaseController.findAll);
router.get("/:id", subclaseController.findOneById);
router.post("/", validateRequest(subclaseSchemaCreate), subclaseController.createOne);
router.put("/:id", validateRequest(subclaseSchemaUpdate), subclaseController.updateOne);

export default router;