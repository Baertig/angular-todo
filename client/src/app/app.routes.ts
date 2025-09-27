import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/:id', component: TodoDetailsComponent }
];
