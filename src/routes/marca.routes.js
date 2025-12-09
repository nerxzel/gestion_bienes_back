import { Router } from "express";
import marcaController from "../controllers/marca.controller.js";

const router = Router();

router.get("/", marcaController.findAll);
router.get("/:id", marcaController.findOneById);
router.post("/", marcaController.createOne);
router.put("/:id", marcaController.updateOne);

export default router;