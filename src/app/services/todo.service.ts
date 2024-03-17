import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ITodoListItem } from '../models/ITodo';
import { PagedTodoList } from '../models/PagedTodoList';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { map } from 'rxjs';

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

  plainGetTodos() {
    return this.http
      .get<PagedTodoList>(
        this.baseUrl + 'paged?page=1&pageSize=10&isAscending=true'
      )
      .pipe(map(pagedTodos => pagedTodos.items.slice(0, 5)));
  }

  getTodosPaged(pageEvent: PageEvent, sort: Sort) {
    const queryParams = new HttpParams()
      .append('page', pageEvent.pageIndex + 1)
      .append('pageSize', pageEvent.pageSize)
      .append('sortBy', sort.active)
      .append('isAscending', sort.direction === 'asc');

    this.http
      .get<PagedTodoList>('https://localhost:7106/api/Todos/paged', {
        params: queryParams,
      })
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
