import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodoListItem } from '../models/ITodo';
import { PagedTodoList } from '../models/PagedTodoList';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'https://localhost:7106/api/Todos/';
  private todosSignal = signal<PagedTodoList>({
    items: [],
    page: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
  });

  readonly todos = this.todosSignal.asReadonly();

  constructor(private http: HttpClient) {}

  getTodos(): void {
    this.http
      .get<PagedTodoList>(
        this.baseUrl + 'paged?page=1&pageSize=10&isAscending=true'
      )
      .subscribe(todos => this.todosSignal.set(todos));
  }

  updateTodo({ id, title, description, status }: ITodoListItem): void {
    this.http
      .put<ITodoListItem>(this.baseUrl + id, { title, description, status })
      .subscribe({
        next: () => this.getTodos(),
        error: error => {
          console.error(error);
        },
      });
  }
}
