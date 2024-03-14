import { Component, effect, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-todo-table',
  standalone: true,
  imports: [
    JsonPipe,
    MatTableModule,
    DatePipe,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.scss',
})
export class TodoTableComponent {
  todos = this.todosService.todos;
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

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'createdAt',
    'modifiedAt',
  ];

  constructor(private todosService: TodoService) {
    effect(() => {
      const paging = this.paging();
      const sorting = this.sorting();

      this.todosService.getTodosPaged(paging, sorting);
    });
  }
}
