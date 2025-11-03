import { Router } from 'express';
import { QuizController } from '../controllers/quizController.js';

const router = Router();

router.get('/:id', QuizController.getById);
router.get('/:id/questions', QuizController.getQuestions);
router.post('/:id/attempt', QuizController.submitAttempt);

export default router;
