import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { TodosActions } from './todos.actions';
import { ToDo } from '../types/todo';

interface ToDoRaw {
  id: number;
  title: string;
  description: string;
  state: 'Pending' | 'Completed';
  createdAt: string;
  updatedAt: string;
}

const transformToDo = (raw: ToDoRaw): ToDo => ({
  ...raw,
  createdAt: new Date(raw.createdAt),
  updatedAt: new Date(raw.updatedAt),
});

@Injectable()
export class TodosEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(() =>
        this.http.get<ToDoRaw[]>('/todos').pipe(
          map((rawTodos) => rawTodos.map(transformToDo)),
          map((todos) => TodosActions.loadTodosSuccess({ todos })),
          catchError((error) =>
            of(
              TodosActions.loadTodosFailure({
                error: error.message || 'Failed to load todos',
              })
            )
          )
        )
      )
    )
  );

  loadTodoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodoById),
      switchMap(({ todoId }) =>
        this.http.get<ToDoRaw>(`/todos/${todoId}`).pipe(
          map(transformToDo),
          map((todo) => TodosActions.loadTodoByIdSuccess({ todo })),
          catchError((error) =>
            of(
              TodosActions.loadTodoByIdFailure({
                error: error.message || 'Failed to load todo',
              })
            )
          )
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.addToDo),
      switchMap(({ title }) =>
        this.http.post<ToDoRaw>('/todos', { title }).pipe(
          map(transformToDo),
          map((todo) => TodosActions.addToDoSuccess({ todo })),
          catchError((error) =>
            of(
              TodosActions.addToDoFailure({
                error: error.message || 'Failed to add todo',
              })
            )
          )
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.updateToDo),
      switchMap(({ todoId, updates }) =>
        this.http.patch<ToDoRaw>(`/todos/${todoId}`, updates).pipe(
          map(transformToDo),
          map((todo) => TodosActions.updateToDoSuccess({ todo })),
          catchError((error) =>
            of(
              TodosActions.updateToDoFailure({
                error: error.message || 'Failed to update todo',
              })
            )
          )
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.deleteToDo),
      switchMap(({ todoId }) =>
        this.http.delete<ToDo>(`/todos/${todoId}`).pipe(
          map(() => TodosActions.deleteToDoSuccess({ todoId })),
          catchError((error) =>
            of(
              TodosActions.deleteToDoFailure({
                error: error.message || 'Failed to delete todo',
              })
            )
          )
        )
      )
    )
  );
}