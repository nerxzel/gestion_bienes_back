import { Router } from "express";
import bienController from "../controllers/bien.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js";
import { restrictDemoUser } from "../middlewares/demo.js";
import { bienSchemaCreate, bienSchemaUpdate } from "../validators/bien.schema.js";


const router = Router();

router.use(authenticateToken)
router.use(restrictDemoUser)

router.get("/test", bienController.test);
router.get("/grid", bienController.getGrid);
router.get("/", bienController.findAll);
router.get("/excel", bienController.bienExcel);
router.get("/responsable/:id", bienController.hojaMuralC );
router.get("/:id", bienController.findOneById);
router.post("/",  validateRequest(bienSchemaCreate), bienController.createOne);
router.post("/:id",  bienController.softDelete);
router.put("/depreciar",  bienController.depreciarTodos);
router.put("/alta/:id",  bienController.alta);
router.put("/baja/:id",  bienController.baja);
router.put("/:id", validateRequest(bienSchemaUpdate), bienController.updateOne);
router.delete("/hardDelete/:id",  bienController.hardDelete);


export default router;