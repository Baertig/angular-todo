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
  styles: `
    main {
      width: 100%;
      min-height: 100%;
      padding: 1rem;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .todo-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .todo-item {
      display: flex;
      gap: 8px;
    }

    .todo-content { 
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .todo-content h3 {
      margin: 0;
    }

    .add-button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .add-form {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .add-form input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      flex: 1;
    }

    .add-form button {
      padding: 8px 16px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .error {
      color: red;
      margin-bottom: 1rem;
      padding: 8px;
      background-color: #ffe6e6;
      border: 1px solid #ff9999;
      border-radius: 4px;
    }
  `
})
export class TodoListComponent implements OnInit {
  showAddForm = signal(false);
  newTodoTitle = '';
  
  todos$: Observable<ToDo[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private router: Router,
    private store: Store
  ) {
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
    this.store.dispatch(TodosActions.updateToDo({ 
      todoId: todo.id, 
      updates: { state: newState } 
    }));
  }

  goToDetails(id: number) {
    this.router.navigate(['/todos', id]);
  }
}