import { Router } from 'express';
import { ModuleController } from '../controllers/moduleController.js';

const router = Router();

router.get('/', ModuleController.getAll);
router.get('/:id', ModuleController.getById);
router.get('/:id/details', ModuleController.getDetails);
router.post('/', ModuleController.create);
router.put('/:id', ModuleController.update);
router.delete('/:id', ModuleController.delete);

export default router;
