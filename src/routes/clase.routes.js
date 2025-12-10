import { Router } from "express";
import claseController from "../controllers/clase.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import { claseSchemaCreate, claseSchemaUpdate } from "../validators/clase.schema.js";

const router = Router();

router.get("/", claseController.findAll);
router.get("/:id", claseController.findOneById);
router.post("/", validateRequest(claseSchemaCreate), claseController.createOne);
router.put("/:id", validateRequest(claseSchemaUpdate), claseController.updateOne);

export default router;