import { Router } from "express";
import ubicacionController from "../controllers/ubicacion.controller.js";

const router = Router();

router.get("/", ubicacionController.findAll);
router.get("/:id", ubicacionController.findOneById);
router.post("/", ubicacionController.createOne);
router.put("/:id", ubicacionController.updateOne);

export default router;