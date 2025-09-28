import express from 'express';
import cors from 'cors';
import { setupToDoController } from './todo/todo-controller';

export function createApp() {
  const app = express();
  
  app.use(cors());
  
  app.use(express.json());
  setupToDoController(app);
  return app;
}
