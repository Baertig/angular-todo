import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { TodosActions } from './todos.actions';
import { ToDo } from '../types/todo';

@Injectable()
export class TodosEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(() =>
        this.http.get<ToDo[]>('/todos').pipe(
          map(todos => TodosActions.loadTodosSuccess({ todos })),
          catchError(error => of(TodosActions.loadTodosFailure({ 
            error: error.message || 'Failed to load todos' 
          })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.addToDo),
      switchMap(({ title }) =>
        this.http.post<ToDo>('/todos', { title }).pipe(
          map(todo => TodosActions.addToDoSuccess({ todo })),
          catchError(error => of(TodosActions.addToDoFailure({ 
            error: error.message || 'Failed to add todo' 
          })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.updateToDo),
      switchMap(({ todoId, updates }) =>
        this.http.patch<ToDo>(`/todos/${todoId}`, updates).pipe(
          map(todo => TodosActions.updateToDoSuccess({ todo })),
          catchError(error => of(TodosActions.updateToDoFailure({ 
            error: error.message || 'Failed to update todo' 
          })))
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
          catchError(error => of(TodosActions.deleteToDoFailure({ 
            error: error.message || 'Failed to delete todo' 
          })))
        )
      )
    )
  );
}