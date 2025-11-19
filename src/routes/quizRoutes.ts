import { Router } from 'express';
import { QuizController } from '../controllers/quizController.js';

const router = Router();

router.post('/', QuizController.create);
router.put('/:id', QuizController.update);
router.delete('/:id', QuizController.delete);

router.get('/:id', QuizController.getById);
router.get('/:id/questions', QuizController.getQuestions);

router.post('/:id/questions', QuizController.createQuestion);
router.put('/questions/:questionId', QuizController.updateQuestion);
router.delete('/questions/:questionId', QuizController.deleteQuestion);

router.post('/questions/:questionId/answers', QuizController.createAnswer);
router.put('/answers/:answerId', QuizController.updateAnswer);
router.delete('/answers/:answerId', QuizController.deleteAnswer);

router.post('/:id/attempt', QuizController.submitAttempt);

export default router;
