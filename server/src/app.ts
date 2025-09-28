import express from "express";
import cors from "cors";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import * as schema from "./db/schema";
import { setupToDoController } from "./todo/todo-controller";
import { setupToDoRepository } from "./todo/todo-repository";

export function createApp(db: PostgresJsDatabase<typeof schema>) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const toDoRepository = setupToDoRepository(db);
  setupToDoController(app, toDoRepository);

  return app;
}
