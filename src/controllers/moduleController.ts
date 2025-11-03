import { Request, Response } from 'express';
import { moduleQueries, lessonQueries, quizQueries } from '../db/queries.js';

export class ModuleController {
  
  static async getAll(req: Request, res: Response) {
    try {
      const modules = await moduleQueries.getAll();
      res.json(modules);
    } catch (error) {
      console.error('Error fetching modules:', error);
      res.status(500).json({ error: 'Failed to fetch modules' });
    }
  }

  
  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const module = await moduleQueries.getById(id);

      if (!module) {
        return res.status(404).json({ error: 'Module not found' });
      }

      res.json(module);
    } catch (error) {
      console.error('Error fetching module:', error);
      res.status(500).json({ error: 'Failed to fetch module' });
    }
  }

  
  static async getDetails(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      const [module, lessons, quiz] = await Promise.all([
        moduleQueries.getById(id),
        lessonQueries.getByModuleId(id),
        quizQueries.getByModuleId(id),
      ]);

      if (!module) {
        return res.status(404).json({ error: 'Module not found' });
      }

      res.json({ module, lessons, quiz });
    } catch (error) {
      console.error('Error fetching module details:', error);
      res.status(500).json({ error: 'Failed to fetch module details' });
    }
  }

  
  static async create(req: Request, res: Response) {
    try {
      const module = await moduleQueries.create(req.body);
      res.status(201).json(module);
    } catch (error) {
      console.error('Error creating module:', error);
      res.status(500).json({ error: 'Failed to create module' });
    }
  }

  
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const module = await moduleQueries.update(id, req.body);

      if (!module) {
        return res.status(404).json({ error: 'Module not found' });
      }

      res.json(module);
    } catch (error) {
      console.error('Error updating module:', error);
      res.status(500).json({ error: 'Failed to update module' });
    }
  }

  
  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await moduleQueries.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting module:', error);
      res.status(500).json({ error: 'Failed to delete module' });
    }
  }
}
