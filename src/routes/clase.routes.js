import { Router } from "express";
import claseController from "../controllers/clase.controller.js";

const router = Router();

router.get("/", claseController.findAll);
router.get("/:id", claseController.findOneById);
router.post("/", claseController.createOne);
router.put("/:id", claseController.updateOne);

export default router;