import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToDo } from '../types/todo';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="main">
      @if (todo()) {
        <div class="details-container">
          <h1>Todo Details</h1>
          
          <div class="form-group">
            <label for="title">Title</label>
            <input 
              id="title"
              type="text" 
              [(ngModel)]="todo()!.title"
              class="title-input"
            />
          </div>
          
          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description"
              [(ngModel)]="todo()!.description"
              class="description-textarea"
              rows="5"
            ></textarea>
          </div>
          
          <div class="actions">
            <button class="delete-button" (click)="deleteTodo()">Delete</button>
            <button class="back-button" (click)="goBack()">Back to List</button>
          </div>
        </div>
      } @else {
        <div class="not-found">
          <h1>Todo not found</h1>
          <button class="back-button" (click)="goBack()">Back to List</button>
        </div>
      }
    </main>
  `,
  styles: `
    .main {
      width: 100%;
      min-height: 100vh;
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .details-container {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .not-found {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      font-weight: bold;
      font-size: 14px;
      color: #333;
    }

    .title-input {
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    .description-textarea {
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
      resize: vertical;
      font-family: inherit;
    }

    .actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    .delete-button {
      padding: 12px 24px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .delete-button:hover {
      background-color: #c82333;
    }

    .back-button {
      padding: 12px 24px;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .back-button:hover {
      background-color: #5a6268;
    }

    h1 {
      text-align: center;
      margin: 0;
    }
  `
})
export class TodoDetailsComponent implements OnInit {
  todo = signal<ToDo | null>(null);
  
  // Copy of todos list (for now)
  todos = signal<ToDo[]>([
    {
      id: 1,
      title: 'Learn Angular Signals',
      description: 'Study the new Angular signals API and implement it in the todo app',
      done: false,
      createdAt: new Date('2025-09-25'),
      updatedAt: new Date('2025-09-25'),
      deletedAt: null
    },
    {
      id: 2,
      title: 'Grocery Shopping',
      description: 'Buy milk, bread, eggs, and vegetables for the week',
      done: true,
      createdAt: new Date('2025-09-24'),
      updatedAt: new Date('2025-09-26'),
      deletedAt: null
    },
    {
      id: 3,
      title: 'Write Unit Tests',
      description: 'Create comprehensive unit tests for the todo service and components',
      done: false,
      createdAt: new Date('2025-09-26'),
      updatedAt: new Date('2025-09-26'),
      deletedAt: null
    },
    {
      id: 4,
      title: 'Plan Weekend Trip',
      description: 'Research destinations, book accommodation, and create itinerary',
      done: false,
      createdAt: new Date('2025-09-23'),
      updatedAt: new Date('2025-09-27'),
      deletedAt: null
    },
    {
      id: 5,
      title: 'Review Code',
      description: 'Review pull requests from team members and provide feedback',
      done: true,
      createdAt: new Date('2025-09-22'),
      updatedAt: new Date('2025-09-24'),
      deletedAt: null
    }
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const foundTodo = this.todos().find(t => t.id === id);
    if (foundTodo) {
      this.todo.set(foundTodo);
    }
  }

  deleteTodo() {
    if (this.todo()) {
      // For now, just navigate back - deletion logic can be implemented later
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['/todos']);
  }
}