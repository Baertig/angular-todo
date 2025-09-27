import {Express, RequestHandler, Request} from "express";
import { ToDo, ToDoState } from "./todo-model";

const todos: ToDo[] = [];

interface CreateToDoPayload {
    title?: string,
    description?: string,
}

interface PatchToDoPayload extends CreateToDoPayload {
    state?: ToDoState
}

interface ParamId {
    id: string
}

type RequestWithToDo = Request<ParamId> & {todo: ToDo};

const loadTodo: RequestHandler<ParamId> = (req, res, next) => {
    const id = req.params.id;
    const todo = todos.find(t => t.id === Number(id) && t.deletedAt === null);

    if (!todo) return res.status(404).json({ error: "Not found" });
    (req as RequestWithToDo).todo = todo;
    next();
};

export function setupToDoController(app: Express) {
    app.get("/api/v1/todos", (req, res) => {
        const existing = todos.filter((t) => t.deletedAt === null);

        res.json(existing);
    } )

    app.get("/api/v1/todos/:id", loadTodo, (req, res) => {
        res.json((req as RequestWithToDo).todo)
    })

    app.post("/api/v1/todos", (req, res) => {
        const body = req.body as CreateToDoPayload;
        if (!body.title) {
            return res.status(400).json({ error: "title required" });
        }

        const todo: ToDo = new ToDo(body.title);
        if(body.description) todo.description = body.description;
        
        todos.push(todo);

        res.status(201).json(todo);
    });

    app.patch("/api/v1/todos/:id", loadTodo, (req, res) => {
        const body = req.body as PatchToDoPayload;
        const todo = (req as RequestWithToDo).todo;

    let mutated = false;
    if (body.title !== undefined) { todo.title = body.title; mutated = true; }
    if (body.description !== undefined) { todo.description = body.description; mutated = true; }
    if (body.state !== undefined) { todo.state = body.state; mutated = true; }
    if (mutated) todo.updatedAt = new Date();

        res.json(todo);
    });

    app.delete("/api/v1/todos/:id", loadTodo, (req, res) => {
        const todo = (req as RequestWithToDo).todo;
        todo.deletedAt = new Date();
        todo.updatedAt = new Date();
        res.status(200).json(todo);
    })
}