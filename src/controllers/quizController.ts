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

      return res.json(quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      return res.status(500).json({ error: 'Failed to fetch quiz' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const quiz = await quizQueries.create(req.body);
      res.status(201).json(quiz);
    } catch (error) {
      console.error('Error creating quiz:', error);
      res.status(500).json({ error: 'Failed to create quiz' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const quiz = await quizQueries.update(id, req.body);
      if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
      return res.json(quiz);
    } catch (error) {
      console.error('Error updating quiz:', error);
      return res.status(500).json({ error: 'Failed to update quiz' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await quizQueries.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting quiz:', error);
      res.status(500).json({ error: 'Failed to delete quiz' });
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

  static async createQuestion(req: Request, res: Response) {
    try {
      const quiz_id = parseInt(req.params.id);
      const question = await questionQueries.create({ ...req.body, quiz_id });
      res.status(201).json(question);
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ error: 'Failed to create question' });
    }
  }

  static async updateQuestion(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.questionId);
      const question = await questionQueries.update(id, req.body);
      if (!question) return res.status(404).json({ error: 'Question not found' });
      return res.json(question);
    } catch (error) {
      console.error('Error updating question:', error);
      return res.status(500).json({ error: 'Failed to update question' });
    }
  }

  static async deleteQuestion(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.questionId);
      await questionQueries.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({ error: 'Failed to delete question' });
    }
  }

  static async createAnswer(req: Request, res: Response) {
    try {
      const question_id = parseInt(req.params.questionId);
      const answer = await answerQueries.create({ ...req.body, question_id });
      res.status(201).json(answer);
    } catch (error) {
      console.error('Error creating answer:', error);
      res.status(500).json({ error: 'Failed to create answer' });
    }
  }

  static async updateAnswer(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.answerId);
      const answer = await answerQueries.update(id, req.body);
      if (!answer) return res.status(404).json({ error: 'Answer not found' });
      return res.json(answer);
    } catch (error) {
      console.error('Error updating answer:', error);
      return res.status(500).json({ error: 'Failed to update answer' });
    }
  }

  static async deleteAnswer(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.answerId);
      await answerQueries.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting answer:', error);
      res.status(500).json({ error: 'Failed to delete answer' });
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

      return res.status(201).json(attempt);
    } catch (error) {
      console.error('Error submitting quiz attempt:', error);
      return res.status(500).json({ error: 'Failed to submit quiz attempt' });
    }
  }
}
