import { Injectable, signal } from '@angular/core';
import { ITodo } from '../models/ITodo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSignal = signal<ITodo[]>([]);

  readonly todos = this.todosSignal.asReadonly();

  constructor(private http: HttpClient) {}

  getTodos(): void {
    this.http
      .get<ITodo[]>('http://localhost:3049/api/todos')
      .subscribe(todos => this.todosSignal.set(todos));
  }

  updateTodo(todo: ITodo): void {
    const { id, ...body } = todo;

    this.http
      .put<ITodo>('http://localhost:3049/api/todos/' + todo.id, body)
      .subscribe({
        next: () => this.getTodos(),
        error: error => {
          console.error(error);
        },
      });
  }
}
