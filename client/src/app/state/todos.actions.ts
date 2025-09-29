import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { ToDoState, ToDo } from '../types/todo';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'Load Todos': emptyProps(),
    'Load Todos Success': props<{ todos: ToDo[] }>(),
    'Load Todos Failure': props<{ error: string }>(),

    'Load Todo By Id': props<{ todoId: number }>(),
    'Load Todo By Id Success': props<{ todo: ToDo }>(),
    'Load Todo By Id Failure': props<{ error: string }>(),

    'Add ToDo': props<{ title: string }>(),
    'Add ToDo Success': props<{ todo: ToDo }>(),
    'Add ToDo Failure': props<{ error: string }>(),

    'Update ToDo': props<{
      todoId: number;
      updates: Partial<Pick<ToDo, 'title' | 'description' | 'state'>>;
    }>(),
    'Update ToDo Success': props<{ todo: ToDo }>(),
    'Update ToDo Failure': props<{ error: string }>(),

    'Delete ToDo': props<{ todoId: number }>(),
    'Delete ToDo Success': props<{ todoId: number }>(),
    'Delete ToDo Failure': props<{ error: string }>(),
  },
});