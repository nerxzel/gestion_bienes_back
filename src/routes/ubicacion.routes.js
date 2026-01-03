import { Router } from "express";
import ubicacionController from "../controllers/ubicacion.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js";
import { restrictDemoUser } from "../middlewares/demo.js";
import { ubicacionSchemaCreate, ubicacionSchemaUpdate } from "../validators/ubicacion.schema.js";

const router = Router();

router.use(authenticateToken)
router.use(restrictDemoUser)

router.get("/", ubicacionController.findAll);
router.get("/:id", ubicacionController.findOneById);
router.post("/", validateRequest(ubicacionSchemaCreate), ubicacionController.createOne);
router.put("/:id", validateRequest(ubicacionSchemaUpdate), ubicacionController.updateOne);

export default router;