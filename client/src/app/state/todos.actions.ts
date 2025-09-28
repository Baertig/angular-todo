import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { ToDoState, ToDo } from '../types/todo';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'Load Todos': emptyProps(),
    'Load Todos Success': props<{ todos: ToDo[] }>(),
    'Load Todos Failure': props<{ error: string }>(),
  },
});