import { Router } from "express";
import marcaController from "../controllers/marca.controller.js";

const router = Router();

router.get("/", marcaController.findAllActives);
router.get("/all", marcaController.findAll);
router.get("/:id", marcaController.findOneById);
router.post("/", marcaController.createOne);
router.put("/:id", marcaController.updateOne);
router.delete("/:id", marcaController.softDelete);

export default router;