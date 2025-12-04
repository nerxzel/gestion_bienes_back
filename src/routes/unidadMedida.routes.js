import { Router } from "express";
import unidadMedidaController from "../controllers/unidadMedida.controller.js";

const router = Router();

router.get("/", unidadMedidaController.findAllActives);
router.get("/all", unidadMedidaController.findAll);
router.get("/:id", unidadMedidaController.findOneById);
router.post("/", unidadMedidaController.createOne);
router.put("/:id", unidadMedidaController.updateOne);
router.delete("/:id", unidadMedidaController.softDelete);

export default router;