import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToDo } from '../types/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="main">
        <h1>Todo List</h1>
        <div class="todo-list">

        @for (todo of todos(); track $index) {
            <div class="todo-item">
              <input type="checkbox" [checked]="todo.state === 'Completed'" />

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
  `
})
export class TodoListComponent {
  showAddForm = signal(false);
  newTodoTitle = '';

  constructor(private router: Router) {}

  todos = signal<ToDo[]>([
    {
      id: 1,
      title: 'Learn Angular Signals',
      description: 'Study the new Angular signals API and implement it in the todo app',
      state: 'Pending',
      createdAt: new Date('2025-09-25'),
      updatedAt: new Date('2025-09-25'),
      deletedAt: null
    },
    {
      id: 2,
      title: 'Grocery Shopping',
      description: 'Buy milk, bread, eggs, and vegetables for the week',
      state: 'Completed',
      createdAt: new Date('2025-09-24'),
      updatedAt: new Date('2025-09-26'),
      deletedAt: null
    },
    {
      id: 3,
      title: 'Write Unit Tests',
      description: 'Create comprehensive unit tests for the todo service and components',
      state: 'Pending',
      createdAt: new Date('2025-09-26'),
      updatedAt: new Date('2025-09-26'),
      deletedAt: null
    },
    {
      id: 4,
      title: 'Plan Weekend Trip',
      description: 'Research destinations, book accommodation, and create itinerary',
      state: 'Pending',
      createdAt: new Date('2025-09-23'),
      updatedAt: new Date('2025-09-27'),
      deletedAt: null
    },
    {
      id: 5,
      title: 'Review Code',
      description: 'Review pull requests from team members and provide feedback',
      state: 'Completed',
      createdAt: new Date('2025-09-22'),
      updatedAt: new Date('2025-09-24'),
      deletedAt: null
    }
  ])

  createTodo() {
    const title = this.newTodoTitle.trim();

    if (!title) {
        return;
    }

    const newId = Math.max(...this.todos().map(t => t.id)) + 1;
    const now = new Date();
    
    const newTodo: ToDo = {
    id: newId,
    title,
    description: '',
    state: 'Pending',
    createdAt: now,
    updatedAt: now,
    deletedAt: null
    };
    
    this.todos.update(todos => [...todos, newTodo]);
    this.newTodoTitle = '';
    this.showAddForm.set(false);
  }

  goToDetails(id: number) {
    this.router.navigate(['/todos', id]);
  }
}