import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToDo } from '../types/todo';
import { TodosActions } from '../state/todos.actions';
import { selectTodoById } from '../state/todos.selectors';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <main class="main">
      @if (todo$ | async; as todo) {
      <div class="details-container">
        <h1>Todo Details</h1>

        <div class="form-group">
          <label for="title">Title</label>
          <input id="title" type="text" [(ngModel)]="title" class="title-input" />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            [(ngModel)]="description"
            class="description-textarea"
            rows="5"
          ></textarea>
        </div>

        <div class="actions">
          <button class="delete-button" (click)="deleteTodo()">Delete</button>
          <button class="update-button" (click)="updateTodo()">Update</button>
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

    .update-button {
      padding: 12px 24px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
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

    h1 {
      text-align: center;
      margin: 0;
    }
  `,
})
export class TodoDetailsComponent implements OnInit {
  todo$: Observable<ToDo | undefined>;
  todoId: number | null = null;
  title = '';
  description = '';

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {
    this.todo$ = new Observable();
  }

  ngOnInit() {
    this.todoId = Number(this.route.snapshot.paramMap.get('id'));
    this.todo$ = this.store.select(selectTodoById(this.todoId));

    this.todo$.subscribe((todo) => {
      if (todo) {
        this.title = todo.title;
        this.description = todo.description;
      }
    });

    this.store.dispatch(TodosActions.loadTodos());
  }

  updateTodo() {
    if (!this.todoId) {
      return;
    }

    const updates: Partial<Pick<ToDo, 'title' | 'description'>> = {};
    if (this.title.trim()) {
      updates.title = this.title.trim();
    }

    if (this.description.trim()) {
      updates.description = this.description.trim();
    }

    const updatesEmpty = Object.keys(updates).length === 0;
    if (updatesEmpty) {
      return;
    }

    this.store.dispatch(
      TodosActions.updateToDo({
        todoId: this.todoId,
        updates,
      })
    );

    this.goBack();
  }

  deleteTodo() {
    if (this.todoId) {
      this.store.dispatch(TodosActions.deleteToDo({ todoId: this.todoId }));
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['/todos']);
  }
}
