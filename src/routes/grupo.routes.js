import { Router } from "express";
import grupoController from "../controllers/grupo.controller.js";

const router = Router();

router.get("/", grupoController.findAll);
router.get("/:id", grupoController.findOneById);
router.post("/", grupoController.createOne);
router.put("/:id", grupoController.updateOne);

export default router;