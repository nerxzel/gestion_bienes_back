import { Router } from "express";
import responsableController from "../controllers/responsable.controller.js";

const router = Router();

router.get("/", responsableController.findAll);
router.get("/:id", responsableController.findOneById);
router.post("/", responsableController.createOne);
router.put("/:id", responsableController.updateOne);

export default router;