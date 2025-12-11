import { Router } from "express";
import bienController from "../controllers/bien.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import { bienSchemaCreate, bienSchemaUpdate } from "../validators/bien.schema.js";


const router = Router();

router.get("/test", bienController.test);
router.get("/", bienController.findAll);
router.get("/:id", bienController.findOneById);
router.post("/", validateRequest(bienSchemaCreate), bienController.createOne);
router.put("/:id", validateRequest(bienSchemaUpdate), bienController.updateOne);

export default router;