import { Router } from "express";
import bienController from "../controllers/bien.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { bienSchemaCreate, bienSchemaUpdate } from "../validators/bien.schema.js";


const router = Router();

router.get("/test", authenticateToken, bienController.test);
router.get("/", authenticateToken, bienController.findAll);
router.get("/grid", authenticateToken, bienController.getGrid);
router.post("/", authenticateToken, validateRequest(bienSchemaCreate), bienController.createOne);


// Eh, I think that dinamic routes always have to be at the bottom.
router.get("/:id", authenticateToken, bienController.findOneById);
router.post("/softDelete/:id", authenticateToken, bienController.softDelete);
router.delete("/:id", authenticateToken, bienController.hardDelete);
router.put("/:id", authenticateToken, validateRequest(bienSchemaUpdate), bienController.updateOne);

export default router;