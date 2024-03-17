import { effect, Injectable, model, signal } from '@angular/core';
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

  searching = signal<string>('');

  searchModel = model('');

  constructor(private http: HttpClient) {
    effect(() => {
      const paging = this.paging();
      const sorting = this.sorting();
      const searchString = this.searchModel();

      this.getTodosPaged(paging, sorting, searchString);
    });

    effect(() => {
      const searchString = this.searchModel();

      console.log(searchString);
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
      this.getTodosPaged(this.paging(), this.sorting(), this.searching());
    });
  }

  search(searchString = '') {
    this.searching.set(searchString);
  }

  private getTodosPaged(
    pageEvent: PageEvent,
    sort: Sort,
    searchString: string
  ) {
    const queryParams = new HttpParams()
      .append('page', pageEvent.pageIndex + 1)
      .append('pageSize', pageEvent.pageSize)
      .append('sortBy', sort.active)
      .append('isAscending', sort.direction === 'asc')
      .append('search', searchString);

    this.http
      .get<PagedTodoList>(this.baseUrl + 'paged', {
        params: queryParams,
      })
      .subscribe(todos => this.todosSignal.set(todos));
  }
}
