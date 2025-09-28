import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.state';

// Feature selector
export const selectTodosState = createFeatureSelector<TodosState>('todos');

export const selectTodos = createSelector(
  selectTodosState,
  (state) => state.todos
);

export const selectTodosError = createSelector(
  selectTodosState,
  (state) => state.error
);

export const selectTodosLoading = createSelector(
  selectTodosState,
  (state) => state.loading
);

export const selectTodosLoadingState = createSelector(
  selectTodosLoading,
  (loading) => loading.todos
);

export const selectCreateTodoLoading = createSelector(
  selectTodosLoading,
  (loading) => loading.create
);

export const selectUpdateTodoLoading = createSelector(
  selectTodosLoading,
  (loading) => loading.update
);

export const selectActiveTodos = createSelector(
  selectTodos,
  (todos) => todos.filter(todo => !todo.deletedAt)
);

export const selectTodoById = (todoId: number) => createSelector(
  selectTodos,
  (todos) => todos.find(todo => todo.id === todoId)
);