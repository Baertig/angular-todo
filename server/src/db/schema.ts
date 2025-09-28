import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  description: varchar().notNull(),
  state: varchar({ enum: ["Pending", "Completed"] }).notNull(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),
});
