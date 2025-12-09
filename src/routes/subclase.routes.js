import { Router } from "express";
import subclaseController from "../controllers/subclase.controller.js";

const router = Router();

router.get("/", subclaseController.findAll);
router.get("/:id", subclaseController.findOneById);
router.post("/", subclaseController.createOne);
router.put("/:id", subclaseController.updateOne);

export default router;