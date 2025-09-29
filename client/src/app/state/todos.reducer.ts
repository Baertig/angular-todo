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

  // Add Todo
  on(TodosActions.addToDo, (state) => ({
    ...state,
    loading: { ...state.loading, adding: true },
    error: null
  })),
  
  on(TodosActions.addToDoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: { ...state.loading, adding: false },
    error: null
  })),
  
  on(TodosActions.addToDoFailure, (state, { error }) => ({
    ...state,
    loading: { ...state.loading, adding: false },
    error
  })),

  // Update Todo
  on(TodosActions.updateToDo, (state) => ({
    ...state,
    loading: { ...state.loading, updating: true },
    error: null
  })),
  
  on(TodosActions.updateToDoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => t.id === todo.id ? todo : t),
    loading: { ...state.loading, updating: false },
    error: null
  })),
  
  on(TodosActions.updateToDoFailure, (state, { error }) => ({
    ...state,
    loading: { ...state.loading, updating: false },
    error
  })),

  on(TodosActions.deleteToDo, (state) => ({
    ...state,
    loading: { ...state.loading, deleting: true },
    error: null
  })),
  
  on(TodosActions.deleteToDoSuccess, (state, { todoId }) => ({
    ...state,
    todos: state.todos.filter(t => t.id !== todoId),
    loading: { ...state.loading, deleting: false },
    error: null
  })),
  
  on(TodosActions.deleteToDoFailure, (state, { error }) => ({
    ...state,
    loading: { ...state.loading, deleting: false },
    error
  })),
  
)