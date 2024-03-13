import { Router } from "express";
import UsuarioController from "../controllers/usuarioController.js";

let ctrl = new UsuarioController();

let router = Router();
router.get("/", ctrl.listagemView);
router.get("/cadastrar", ctrl.cadastroView);
router.get("/alterar/:id", ctrl.alterarView);
router.get("/users", ctrl.getAllUsers);
router.get("/users/:id", ctrl.getUserById);
router.put("/alterar/:id", ctrl.editar);
router.post("/cadastrar", ctrl.cadastrar);
router.delete("/deletar/:id", ctrl.deletar);

export default router;
