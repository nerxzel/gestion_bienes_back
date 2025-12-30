import { Router } from "express";
import subclaseController from "../controllers/subclase.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { subclaseSchemaCreate, subclaseSchemaUpdate } from "../validators/subclase.schema.js";

const router = Router();

router.get("/", authenticateToken, subclaseController.findAll);
router.get("/grid", authenticateToken, subclaseController.getGrid)
router.get("/:id", authenticateToken, subclaseController.findOneById);
router.post("/", authenticateToken, validateRequest(subclaseSchemaCreate), subclaseController.createOne);
router.put("/:id", authenticateToken, validateRequest(subclaseSchemaUpdate), subclaseController.updateOne);

export default router;