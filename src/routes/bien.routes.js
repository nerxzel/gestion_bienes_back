import { Router } from "express";
import bienController from "../controllers/bien.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import { bienSchemaCreate, bienSchemaUpdate } from "../validators/bien.schema.js";


const router = Router();

router.get("/test", bienController.test);
router.get("/", bienController.findAll);
router.get("/grid", bienController.getGrid);
router.post("/", validateRequest(bienSchemaCreate), bienController.createOne);

// Eh, I think that dinamic routes always have to be at the bottom.
router.get("/:id", bienController.findOneById);
router.put("/:id", validateRequest(bienSchemaUpdate), bienController.updateOne);

export default router;