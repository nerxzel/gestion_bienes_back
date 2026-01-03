import { Router } from "express";
import claseController from "../controllers/clase.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { restrictDemoUser } from "../middlewares/demo.js";
import { claseSchemaCreate, claseSchemaUpdate } from "../validators/clase.schema.js";

const router = Router();

router.use(authenticateToken)
router.use(restrictDemoUser)

router.get("/", claseController.findAll);
router.get("/grid", claseController.getGrid);
router.get("/:id", claseController.findOneById);
router.post("/", validateRequest(claseSchemaCreate), claseController.createOne);
router.put("/:id", validateRequest(claseSchemaUpdate), claseController.updateOne);

export default router;