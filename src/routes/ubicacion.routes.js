import { Router } from "express";
import ubicacionController from "../controllers/ubicacion.controller.js";

const router = Router();

router.get("/", ubicacionController.findAllActives);
router.get("/all", ubicacionController.findAll);
router.get("/:id", ubicacionController.findOneById);
router.post("/", ubicacionController.createOne);
router.put("/:id", ubicacionController.updateOne);
router.delete("/:id", ubicacionController.softDelete);

export default router;