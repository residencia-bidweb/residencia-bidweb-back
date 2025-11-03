import { pgTable, serial, text, varchar, integer, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

export const modules = pgTable('modules', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  order_index: integer('order_index').notNull(),
  icon: varchar('icon', { length: 255 }),
  estimated_duration: integer('estimated_duration').notNull(), 
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  module_id: integer('module_id')
    .notNull()
    .references(() => modules.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  order_index: integer('order_index').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const quizzes = pgTable('quizzes', {
  id: serial('id').primaryKey(),
  module_id: integer('module_id')
    .notNull()
    .references(() => modules.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  passing_score: integer('passing_score').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  quiz_id: integer('quiz_id')
    .notNull()
    .references(() => quizzes.id, { onDelete: 'cascade' }),
  question_text: text('question_text').notNull(),
  question_type: varchar('question_type', { length: 20 })
    .$type<'multiple_choice' | 'true_false' | 'multiple_select'>()
    .notNull(),
  order_index: integer('order_index').notNull(),
  points: integer('points').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const answers = pgTable('answers', {
  id: serial('id').primaryKey(),
  question_id: integer('question_id')
    .notNull()
    .references(() => questions.id, { onDelete: 'cascade' }),
  answer_text: text('answer_text').notNull(),
  is_correct: boolean('is_correct').notNull(),
  order_index: integer('order_index').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  user_id: varchar('user_id', { length: 36 }).notNull(),
  module_id: integer('module_id')
    .notNull()
    .references(() => modules.id, { onDelete: 'cascade' }),
  lesson_id: integer('lesson_id').references(() => lessons.id, { onDelete: 'set null' }),
  completed: boolean('completed').notNull().default(false),
  completed_at: timestamp('completed_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const quizAttempts = pgTable('quiz_attempts', {
  id: serial('id').primaryKey(),
  user_id: varchar('user_id', { length: 36 }).notNull(),
  quiz_id: integer('quiz_id')
    .notNull()
    .references(() => quizzes.id, { onDelete: 'cascade' }),
  score: integer('score').notNull(),
  passed: boolean('passed').notNull(),
  answers_data: jsonb('answers_data').$type<Record<string, string[]>>().notNull(),
  completed_at: timestamp('completed_at').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const tables = {
  modules,
  lessons,
  quizzes,
  questions,
  answers,
  userProgress,
  quizAttempts,
};