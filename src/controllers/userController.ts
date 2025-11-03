import { Request, Response } from 'express';
import { UserQueries } from '../db/queries.js';

export class UserController {
  // GET /api/users
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserQueries.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  // GET /api/users/:id
  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserQueries.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  // POST /api/users
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      const user = await UserQueries.createUser({ name, email });
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  // PUT /api/users/:id
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const user = await UserQueries.updateUser(id, updates);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  // DELETE /api/users/:id
  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await UserQueries.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}
