import { Router } from 'express';
import TabsController from '../controllers/tabsController.js';

const router = Router();

let ctrl = new TabsController();
router.get('/', ctrl.tabsView);


export default router;