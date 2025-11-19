import { Request, Response } from 'express';
import { lessonQueries } from '../db/queries.js';

export class LessonController {
  static async listByModule(req: Request, res: Response) {
    try {
      const moduleId = parseInt(req.query.moduleId as string);
      if (isNaN(moduleId)) return res.status(400).json({ error: 'moduleId is required' });
      const lessons = await lessonQueries.getByModuleId(moduleId);
      res.json(lessons);
    } catch (error) {
      console.error('Error listing lessons:', error);
      res.status(500).json({ error: 'Failed to list lessons' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const lesson = await lessonQueries.create(req.body);
      res.status(201).json(lesson);
    } catch (error) {
      console.error('Error creating lesson:', error);
      res.status(500).json({ error: 'Failed to create lesson' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const lesson = await lessonQueries.update(id, req.body);
      if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
      res.json(lesson);
    } catch (error) {
      console.error('Error updating lesson:', error);
      res.status(500).json({ error: 'Failed to update lesson' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await lessonQueries.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      res.status(500).json({ error: 'Failed to delete lesson' });
    }
  }
}