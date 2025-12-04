import { Router } from "express";
import responsableController from "../controllers/responsable.controller.js";

const router = Router();

router.get("/", responsableController.findAllActives);
router.get("/all", responsableController.findAll);
router.get("/:id", responsableController.findOneById);
router.post("/", responsableController.createOne);
router.put("/:id", responsableController.updateOne);
router.delete("/:id", responsableController.softDelete);

export default router;