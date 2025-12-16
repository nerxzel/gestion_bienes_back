import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import authenticateToken from "../middlewares/auth.js"
import { userSchemaCreate, userSchemaUpdate, loginSchema } from "../validators/user.schema.js";


const router = Router();

router.get("/", authenticateToken, userController.findAll);
router.post("/", validateRequest(userSchemaCreate), userController.createOne);
router.post("/login", validateRequest(loginSchema), userController.login);
router.get("/:id", authenticateToken, userController.findOneById);
router.put("/:id", authenticateToken,  validateRequest(userSchemaUpdate), userController.updateOne);

export default router;