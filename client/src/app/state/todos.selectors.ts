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

export const selectAddingTodoLoading = createSelector(
  selectTodosLoading,
  (loading) => loading.adding
);

export const selectUpdatingTodoLoading = createSelector(
  selectTodosLoading,
  (loading) => loading.updating
);

export const selectDeletingTodoLoading = createSelector(
  selectTodosLoading,
  (loading) => loading.deleting
);

export const selectTodoById = (todoId: number) => createSelector(
  selectTodos,
  (todos) => todos.find(todo => todo.id === todoId)
);