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
}