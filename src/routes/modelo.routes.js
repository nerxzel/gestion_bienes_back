import { Router } from "express";
import modeloController from "../controllers/modelo.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js";
import { restrictDemoUser } from "../middlewares/demo.js";
import { modeloSchemaCreate, modeloSchemaUpdate } from "../validators/modelo.schema.js";

const router = Router();

router.use(authenticateToken)
router.use(restrictDemoUser)

router.get("/", modeloController.findAll);
router.get("/grid", modeloController.getGrid);
router.get("/:id", modeloController.findOneById);
router.post("/", validateRequest(modeloSchemaCreate), modeloController.createOne);
router.put("/:id", validateRequest(modeloSchemaUpdate), modeloController.updateOne);

export default router;