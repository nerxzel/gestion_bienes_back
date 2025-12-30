import { Router } from "express";
import claseController from "../controllers/clase.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { claseSchemaCreate, claseSchemaUpdate } from "../validators/clase.schema.js";

const router = Router();

router.get("/", authenticateToken, claseController.findAll);
router.get("/grid", authenticateToken, claseController.getGrid);
router.get("/:id", authenticateToken, claseController.findOneById);
router.post("/", authenticateToken, validateRequest(claseSchemaCreate), claseController.createOne);
router.put("/:id", authenticateToken, validateRequest(claseSchemaUpdate), claseController.updateOne);

export default router;