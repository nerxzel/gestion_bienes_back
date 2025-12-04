import { Router } from "express";
import subclaseController from "../controllers/subclase.controller.js";

const router = Router();

router.get("/", subclaseController.findAllActives);
router.get("/all", subclaseController.findAll);
router.get("/:id", subclaseController.findOneById);
router.post("/", subclaseController.createOne);
router.put("/:id", subclaseController.updateOne);
router.delete("/:id", subclaseController.softDelete);

export default router;