import { Router } from "express";
import claseController from "../controllers/clase.controller.js";

const router = Router();

router.get("/", claseController.findAllActives);
router.get("/all", claseController.findAll);
router.get("/:id", claseController.findOneById);
router.post("/", claseController.createOne);
router.put("/:id", claseController.updateOne);
router.delete("/:id", claseController.softDelete);

export default router;