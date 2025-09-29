import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToDo } from '../types/todo';
import { TodosActions } from '../state/todos.actions';
import { selectActiveTodos, selectTodosLoadingState, selectTodosError } from '../state/todos.selectors';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <main class="main">
      <h1>Todo List</h1>

      <div class="todo-list">

        @if (loading$ | async) {
          <div>Loading todos...</div>
        }
        
        @if (error$ | async; as error) {
          <div class="error">Error: {{ error }}</div>
        }

        @for (todo of todos$ | async; track todo.id) {
            <div class="todo-item">
              <input type="checkbox" 
                     [checked]="todo.state === 'Completed'" 
                     (change)="toggleTodoState(todo)" />

              <div class="todo-content">
                <h3>{{ todo.title }}</h3>
                <span>{{ todo.description.split('\n')[0] }}</span>
              </div>

              <button (click)="goToDetails(todo.id)">Details</button>
            </div>
        }

        @if (showAddForm()) {
          <div class="add-form">
            <input 
              type="text" 
              placeholder="title" 
              [(ngModel)]="newTodoTitle" 
              (keydown.enter)="createTodo()"
              #titleInput
            />

            <button (click)="createTodo()">Create</button>
          </div>
        } @else {
          <button class="add-button" (click)="showAddForm.set(true)">Add</button>
        }

      </div>
    </main>
  `,
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  showAddForm = signal(false);
  newTodoTitle = '';

  todos$: Observable<ToDo[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private router: Router, private store: Store) {
    this.todos$ = this.store.select(selectActiveTodos);
    this.loading$ = this.store.select(selectTodosLoadingState);
    this.error$ = this.store.select(selectTodosError);
  }

  ngOnInit() {
    this.store.dispatch(TodosActions.loadTodos());
  }

  createTodo() {
    const title = this.newTodoTitle.trim();

    if (!title) {
      return;
    }

    this.store.dispatch(TodosActions.addToDo({ title }));
    this.newTodoTitle = '';
    this.showAddForm.set(false);
  }

  toggleTodoState(todo: ToDo) {
    const newState = todo.state === 'Completed' ? 'Pending' : 'Completed';
    this.store.dispatch(
      TodosActions.updateToDo({
        todoId: todo.id,
        updates: { state: newState },
      })
    );
  }

  goToDetails(id: number) {
    this.router.navigate(['/todos', id]);
  }
}