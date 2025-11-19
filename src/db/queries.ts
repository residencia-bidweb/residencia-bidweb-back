import { db } from '../config/database.js';
import { modules, lessons, quizzes, questions, answers, userProgress, quizAttempts } from './schema/index.js';
import { eq, asc } from 'drizzle-orm';

export const moduleQueries = {
  getAll: async () => {
    return await db.select().from(modules).orderBy(asc(modules.order_index));
  },

  getById: async (id: number) => {
    const result = await db.select().from(modules).where(eq(modules.id, id));
    return result[0] || null;
  },

  create: async (data: typeof modules.$inferInsert) => {
    const result = await db.insert(modules).values(data).returning();
    return result[0];
  },

  update: async (id: number, data: Partial<typeof modules.$inferInsert>) => {
    const result = await db.update(modules).set(data).where(eq(modules.id, id)).returning();
    return result[0] || null;
  },

  delete: async (id: number) => {
    await db.delete(modules).where(eq(modules.id, id));
    return true;
  },
};

export const lessonQueries = {
  getByModuleId: async (moduleId: number) => {
    return await db.select().from(lessons).where(eq(lessons.module_id, moduleId)).orderBy(asc(lessons.order_index));
  },

  getById: async (id: number) => {
    const result = await db.select().from(lessons).where(eq(lessons.id, id));
    return result[0] || null;
  },

  create: async (data: typeof lessons.$inferInsert) => {
    const result = await db.insert(lessons).values(data).returning();
    return result[0];
  },

  update: async (id: number, data: Partial<typeof lessons.$inferInsert>) => {
    const result = await db.update(lessons).set(data).where(eq(lessons.id, id)).returning();
    return result[0] || null;
  },

  delete: async (id: number) => {
    await db.delete(lessons).where(eq(lessons.id, id));
    return true;
  },
};

export const quizQueries = {
  getByModuleId: async (moduleId: number) => {
    const result = await db.select().from(quizzes).where(eq(quizzes.module_id, moduleId));
    return result[0] || null;
  },

  getById: async (id: number) => {
    const result = await db.select().from(quizzes).where(eq(quizzes.id, id));
    return result[0] || null;
  },

  create: async (data: typeof quizzes.$inferInsert) => {
    const result = await db.insert(quizzes).values(data).returning();
    return result[0];
  },

  update: async (id: number, data: Partial<typeof quizzes.$inferInsert>) => {
    const result = await db.update(quizzes).set(data).where(eq(quizzes.id, id)).returning();
    return result[0] || null;
  },

  delete: async (id: number) => {
    await db.delete(quizzes).where(eq(quizzes.id, id));
    return true;
  },
};

export const questionQueries = {
  getByQuizId: async (quizId: number) => {
    return await db.select().from(questions).where(eq(questions.quiz_id, quizId)).orderBy(asc(questions.order_index));
  },

  create: async (data: typeof questions.$inferInsert) => {
    const result = await db.insert(questions).values(data).returning();
    return result[0];
  },

  update: async (id: number, data: Partial<typeof questions.$inferInsert>) => {
    const result = await db.update(questions).set(data).where(eq(questions.id, id)).returning();
    return result[0] || null;
  },

  delete: async (id: number) => {
    await db.delete(questions).where(eq(questions.id, id));
    return true;
  },
};

export const answerQueries = {
  getByQuestionId: async (questionId: number) => {
    return await db.select().from(answers).where(eq(answers.question_id, questionId)).orderBy(asc(answers.order_index));
  },

  create: async (data: typeof answers.$inferInsert) => {
    const result = await db.insert(answers).values(data).returning();
    return result[0];
  },

  update: async (id: number, data: Partial<typeof answers.$inferInsert>) => {
    const result = await db.update(answers).set(data).where(eq(answers.id, id)).returning();
    return result[0] || null;
  },

  delete: async (id: number) => {
    await db.delete(answers).where(eq(answers.id, id));
    return true;
  },
};

export const progressQueries = {
  getByUserId: async (userId: string) => {
    return await db.select().from(userProgress).where(eq(userProgress.user_id, userId));
  },

  create: async (data: typeof userProgress.$inferInsert) => {
    const result = await db.insert(userProgress).values(data).returning();
    return result[0];
  },

  update: async (id: number, data: Partial<typeof userProgress.$inferInsert>) => {
    const result = await db.update(userProgress).set(data).where(eq(userProgress.id, id)).returning();
    return result[0] || null;
  },
};

export const attemptQueries = {
  getByUserId: async (userId: string) => {
    return await db.select().from(quizAttempts).where(eq(quizAttempts.user_id, userId));
  },

  create: async (data: typeof quizAttempts.$inferInsert) => {
    const result = await db.insert(quizAttempts).values(data).returning();
    return result[0];
  },
};
