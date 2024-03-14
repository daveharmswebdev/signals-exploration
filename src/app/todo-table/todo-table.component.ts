import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-todo-table',
  standalone: true,
  imports: [JsonPipe, MatTableModule, DatePipe, MatPaginatorModule],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.scss',
})
export class TodoTableComponent implements OnInit {
  todos = this.todosService.todos;
  // paging = signal<PageEvent>({
  //   length: 0,
  //   pageIndex: 0,
  //   pageSize: 0,
  //   previousPageIndex: 0,
  // });

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'createdAt',
    'modifiedAt',
  ];

  constructor(private todosService: TodoService) {}

  ngOnInit(): void {
    this.todosService.getTodos();
  }

  pageEvent(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.todosService.getTodosPaged(pageEvent);
  }
}
