import { ToDo } from '../types/todo';

export interface TodosState {
  todos: ToDo[];
  error: string | null;
  loading: {
    todos: boolean;
    adding: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

export const initialTodosState: TodosState = {
  todos: [],
  error: null,
  loading: {
    todos: false,
    adding: false,
    updating: false,
    deleting: false,
  },
};
