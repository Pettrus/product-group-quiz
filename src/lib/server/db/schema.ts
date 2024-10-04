import { integer, pgTable, serial, varchar, text, pgEnum, json } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: varchar('name', {length: 256}).notNull(),
  points: integer('points').notNull().default(0),
  questionsAnswered: json('questionsAnswered').default([]),
});

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard']);
export const categoryEnum = pgEnum('category', ['category1', 'category2']);

export const questionsTable = pgTable('questions_table', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  options: text('options').notNull(),
  answer: integer('answer').notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  category: categoryEnum('category'),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertQuestion = typeof questionsTable.$inferInsert;
export type SelectQuestion = typeof questionsTable.$inferSelect;