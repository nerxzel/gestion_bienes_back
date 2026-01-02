import { Router } from "express";
import marcaController from "../controllers/marca.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js";
import { restrictDemoUser } from "../middlewares/demo.js";
import { marcaSchemaCreate, marcaSchemaUpdate } from "../validators/marca.schema.js";

const router = Router();

router.use(authenticateToken)
router.use(restrictDemoUser)

router.get("/", marcaController.findAll);
router.get("/:id", marcaController.findOneById);
router.post("/", validateRequest(marcaSchemaCreate), marcaController.createOne);
router.put("/:id", validateRequest(marcaSchemaUpdate), marcaController.updateOne);

export default router;