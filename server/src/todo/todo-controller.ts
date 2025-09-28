import {Express, RequestHandler, Request} from "express";
import { ToDo, ToDoState } from "./todo-model";
import { ToDoRepository } from "./todo-repository";

interface CreateToDoPayload {
  title?: string;
  description?: string;
}

interface PatchToDoPayload extends CreateToDoPayload {
  state?: ToDoState;
}

interface ParamId {
  id: string;
}

type RequestWithToDo = Request<ParamId> & { todo: ToDo };

export function setupToDoController(app: Express, repo: ToDoRepository) {
  app.get("/api/v1/todos", async (req, res) => {
    try {
      const todos = await repo.fetchToDos({ active: true });
      res.json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/v1/todos/:id", async (req, res) => {
    try {
      const toDoId = parseInt(req.params.id, 10); 

      if (isNaN(toDoId)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const todo = await repo.findToDo({ toDoId });

      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/v1/todos", async (req, res) => {
    try {
      const body = req.body as CreateToDoPayload;
      if (!body.title) {
        return res.status(400).json({ error: "title required" });
      }

      const todo = await repo.createToDo({ 
        title: body.title, 
        description: body.description 
      });

      res.status(201).json(todo);
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/v1/todos/:id", async (req, res) => {
    try {
      const toDoId = parseInt(req.params.id, 10);
      
      if (isNaN(toDoId)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const body = req.body as PatchToDoPayload;

      const updatedTodo = await repo.updateToDo({
        toDoId,
        title: body.title,
        description: body.description,
        state: body.state
      });

      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/v1/todos/:id", async (req, res) => {
    try {
      const toDoId = parseInt(req.params.id, 10);
      
      if (isNaN(toDoId)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const deletedTodo = await repo.updateToDo({
        toDoId,
        deletedAt: new Date()
      });

      if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.status(200).json(deletedTodo);
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}