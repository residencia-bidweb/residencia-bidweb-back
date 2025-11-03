import { Request, Response } from 'express';
import { quizQueries, questionQueries, answerQueries, attemptQueries } from '../db/queries.js';

export class QuizController {
  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const quiz = await quizQueries.getById(id);

      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }

      res.json(quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      res.status(500).json({ error: 'Failed to fetch quiz' });
    }
  }

  static async getQuestions(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const questions = await questionQueries.getByQuizId(id);

      const questionsWithAnswers = await Promise.all(
        questions.map(async (question) => {
          const answers = await answerQueries.getByQuestionId(question.id);
          return { ...question, answers };
        })
      );

      res.json(questionsWithAnswers);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      res.status(500).json({ error: 'Failed to fetch quiz questions' });
    }
  }

  static async submitAttempt(req: Request, res: Response) {
    try {
      const quizId = parseInt(req.params.id);
      const { user_id, answers_data } = req.body;

      if (!user_id || !answers_data) {
        return res.status(400).json({ error: 'user_id and answers_data are required' });
      }

      const quiz = await quizQueries.getById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }

      const questions = await questionQueries.getByQuizId(quizId);

      
      let totalPoints = 0;
      let earnedPoints = 0;

      for (const question of questions) {
        totalPoints += question.points;
        const correctAnswers = await answerQueries.getByQuestionId(question.id);
        const correctAnswerIds = correctAnswers
          .filter((a) => a.is_correct)
          .map((a) => a.id.toString());

        const userAnswers = answers_data[question.id.toString()] || [];

        
        const isCorrect =
          correctAnswerIds.length === userAnswers.length &&
          correctAnswerIds.every((id) => userAnswers.includes(id));

        if (isCorrect) {
          earnedPoints += question.points;
        }
      }

      const score = Math.round((earnedPoints / totalPoints) * 100);
      const passed = score >= quiz.passing_score;

      const attempt = await attemptQueries.create({
        user_id,
        quiz_id: quizId,
        score,
        passed,
        answers_data,
        completed_at: new Date(),
      });

      res.status(201).json(attempt);
    } catch (error) {
      console.error('Error submitting quiz attempt:', error);
      res.status(500).json({ error: 'Failed to submit quiz attempt' });
    }
  }
}
