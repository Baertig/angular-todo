import { createReducer, on } from '@ngrx/store';
import { TodosActions } from './todos.actions';
import { TodosState, initialTodosState } from './todos.state';

export const todosReducer = createReducer(
  initialTodosState,
  
  // Load Todos
  on(TodosActions.loadTodos, (state) => ({
    ...state,
    loading: { ...state.loading, todos: true },
    error: null
  })),
  
  on(TodosActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: { ...state.loading, todos: false },
    error: null
  })),
  
  on(TodosActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: { ...state.loading, todos: false },
    error
  })),
  
)