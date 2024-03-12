import { Router } from 'express';
import UsuarioController from '../controllers/usuarioController.js';

let ctrl = new UsuarioController();

let router = Router();
router.get('/',ctrl.listagemView);
router.get('/cadastrar',ctrl.cadastroView);
router.get('/alterar/:id',ctrl.alterarView);
router.post('/cadastrar',ctrl.cadastrar);
router.get('/users', ctrl.getAllUsers);
router.get('users/:id', ctrl.getUserById);

export default router;