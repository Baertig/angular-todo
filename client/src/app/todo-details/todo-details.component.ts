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
          <button class="save-button" (click)="updateTodo()">Save</button>
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
  styleUrls: ['./todo-details.component.css'],
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

    this.store.dispatch(TodosActions.loadTodoById({ todoId: this.todoId }));
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
