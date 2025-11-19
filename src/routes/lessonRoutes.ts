import { Router } from 'express';
import { LessonController } from '../controllers/lessonController.js';

const router = Router();

router.get('/', LessonController.listByModule); // /api/lessons?moduleId=1
router.post('/', LessonController.create);
router.put('/:id', LessonController.update);
router.delete('/:id', LessonController.delete);

export default router;