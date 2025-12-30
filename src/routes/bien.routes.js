import { Router } from "express";
import bienController from "../controllers/bien.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { bienSchemaCreate, bienSchemaUpdate } from "../validators/bien.schema.js";


const router = Router();

router.get("/test", authenticateToken, bienController.test);
router.get("/grid", authenticateToken, bienController.getGrid);
router.get("/", authenticateToken, bienController.findAll);
router.get("/:id", authenticateToken, bienController.findOneById);
router.post("/", authenticateToken, validateRequest(bienSchemaCreate), bienController.createOne);
router.post("/:id", authenticateToken, bienController.softDelete);
router.put("/depreciar", authenticateToken, bienController.depreciarTodos);
router.put("/alta/:id", authenticateToken, bienController.alta);
router.put("/baja/:id", authenticateToken, bienController.baja);
router.put("/:id", authenticateToken, validateRequest(bienSchemaUpdate), bienController.updateOne);
router.delete("/hardDelete/:id", authenticateToken, bienController.hardDelete);


export default router;