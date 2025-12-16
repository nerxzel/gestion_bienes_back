import { Router } from "express";
import marcaController from "../controllers/marca.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { marcaSchemaCreate, marcaSchemaUpdate } from "../validators/marca.schema.js";

const router = Router();

router.get("/", authenticateToken, marcaController.findAll);
router.get("/:id", authenticateToken, marcaController.findOneById);
router.post("/", authenticateToken, validateRequest(marcaSchemaCreate), marcaController.createOne);
router.put("/:id", authenticateToken, validateRequest(marcaSchemaUpdate), marcaController.updateOne);

export default router;