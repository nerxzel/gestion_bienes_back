import { Router } from "express";
import unidadMedidaController from "../controllers/unidadMedida.controller.js";

const router = Router();

router.get("/", unidadMedidaController.findAll);
router.get("/:id", unidadMedidaController.findOneById);
router.post("/", unidadMedidaController.createOne);
router.put("/:id", unidadMedidaController.updateOne);

export default router;