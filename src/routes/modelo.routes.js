import { Router } from "express";
import modeloController from "../controllers/modelo.controller.js";

const router = Router();

router.get("/", modeloController.findAll);
router.get("/:id", modeloController.findOneById);
router.post("/", modeloController.createOne);
router.put("/:id", modeloController.updateOne);

export default router;