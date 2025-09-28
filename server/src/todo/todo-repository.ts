import { ToDo, ToDoState } from "./todo-model";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import assert from "assert";

import * as schema from "../db/schema";
import { omitUndefined } from "../common/object";

export interface ToDoRepository {
  fetchToDos(): Promise<ToDo[]>;

  findToDo({ toDoId }: { toDoId: number }): Promise<ToDo | null>;

  updateToDo({
    toDoId,
    title,
    description,
    state,
  }: {
    toDoId: number;
    title?: string;
    description?: string;
    state?: ToDoState;
  }): Promise<ToDo | null>;

  createToDo({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }): Promise<ToDo>;

  deleteToDo({ toDoId }: { toDoId: number }): Promise<boolean>;
}

export const setupToDoRepository = (
  db: PostgresJsDatabase<typeof schema>
): ToDoRepository => ({
  async fetchToDos() {
    return await db.select().from(schema.todos);
  },

  async findToDo({ toDoId }) {
    const result = await db
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.id, toDoId))
      .limit(1);

    return result.length === 0 ? null : result[0];
  },

  async updateToDo({ toDoId, title, description, state }) {
    const updates = omitUndefined({ title, description, state });

    if (Object.keys(updates).length === 0) {
      return null;
    }

    const now = new Date();

    const result = await db
      .update(schema.todos)
      .set({
        ...updates,
        updatedAt: now,
      })
      .where(eq(schema.todos.id, toDoId))
      .returning();

    return result.length === 0 ? null : result[0];
  },

  async createToDo({ title, description }) {
    const now = new Date();

    const result = await db
      .insert(schema.todos)
      .values({
        title,
        description: description ? description : "",
        state: "Pending",
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    assert(result.length === 1, "Expected exactly one inserted record");

    return result[0];
  },

  async deleteToDo({ toDoId }) {
    const result = await db
      .delete(schema.todos)
      .where(eq(schema.todos.id, toDoId))
      .returning();

    return result.length > 0;
  },
});
