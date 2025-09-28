import { ToDo } from '../types/todo';

export interface TodosState {
  todos: ToDo[];
  error: string | null;
  loading: {
    todos: boolean;
    create: boolean;
    update: boolean;
  };
}

export const initialTodosState: TodosState = {
  todos: [],
  error: null,
  loading: {
    todos: false,
    create: false,
    update: false
  }
};