import { effect, Injectable, signal } from '@angular/core';
import { PagedTodoList } from '../models/PagedTodoList';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ITodoListItem } from '../models/ITodo';

@Injectable({
  providedIn: 'root',
})
export class FancyTodosService {
  private baseUrl = 'https://localhost:7106/api/Todos/';
  private todosSignal = signal<PagedTodoList>({
    items: [],
    page: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
  });

  readonly todos = this.todosSignal.asReadonly();

  paging = signal<PageEvent>({
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0,
  });

  sorting = signal<Sort>({
    active: '',
    direction: 'asc',
  });

  constructor(private http: HttpClient) {
    effect(() => {
      const paging = this.paging();
      const sorting = this.sorting();

      this.getTodosPaged(paging, sorting);
    });
  }

  updateTodo(todo: ITodoListItem) {
    const { id, title, description, status } = todo;
    const body = {
      title,
      description,
      status,
    };
    this.http.put(this.baseUrl + id, body).subscribe(response => {
      this.getTodosPaged(this.paging(), this.sorting());
    });
  }

  private getTodosPaged(pageEvent: PageEvent, sort: Sort) {
    const queryParams = new HttpParams()
      .append('page', pageEvent.pageIndex + 1)
      .append('pageSize', pageEvent.pageSize)
      .append('sortBy', sort.active)
      .append('isAscending', sort.direction === 'asc');

    this.http
      .get<PagedTodoList>(this.baseUrl + 'paged', {
        params: queryParams,
      })
      .subscribe(todos => this.todosSignal.set(todos));
  }
}
