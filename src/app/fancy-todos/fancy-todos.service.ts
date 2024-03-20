import { effect, Injectable, model, signal, untracked } from '@angular/core';
import { PagedTodoList } from '../models/PagedTodoList';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ITodoListItem } from '../models/ITodo';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  throwError,
} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

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

  // searching = signal<string>('');

  searchModel = model('');

  searchSignal = toSignal(
    toObservable(this.searchModel).pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
  );

  constructor(private http: HttpClient) {
    effect(() => {
      const paging = this.paging();
      const sorting = this.sorting();
      const searchString = untracked(this.searchSignal);
      // const searchString = this.searching();

      this.getTodosPaged(paging, sorting, searchString || '');
    });

    effect(
      () => {
        const searchString = this.searchSignal();
        const paging: PageEvent = {
          length: 0,
          pageIndex: 0,
          pageSize: 10,
          previousPageIndex: 0,
        };
        const sorting: Sort = {
          active: '',
          direction: 'asc',
        };

        this.paging.set({
          length: 0,
          pageIndex: 0,
          pageSize: 10,
          previousPageIndex: 0,
        });

        this.getTodosPaged(paging, sorting, searchString || '');
      },
      { allowSignalWrites: true }
    );
  }

  updateTodo(todo: ITodoListItem) {
    const { id, title, description, status } = todo;
    const body = {
      title,
      description,
      status,
    };
    this.http.put(this.baseUrl + id, body).subscribe(response => {
      this.getTodosPaged(this.paging(), this.sorting(), this.searchModel());
    });
  }

  // search(searchString = '') {
  //   this.searching.set(searchString);
  // }

  delete(todo: ITodoListItem) {
    this.http
      .delete(this.baseUrl + todo.id)
      .pipe(catchError(this.handleError))
      .subscribe(() =>
        this.getTodosPaged(this.paging(), this.sorting(), this.searchModel())
      );
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
