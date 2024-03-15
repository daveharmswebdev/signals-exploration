import { Component, OnInit } from '@angular/core';
import { FancyTodosService } from './fancy-todos.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StatusCardComponent } from '../status-card/status-card.component';
import { ITodoListItem } from '../models/ITodo';

@Component({
  selector: 'app-fancy-todos',
  standalone: true,
  imports: [
    JsonPipe,
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    StatusCardComponent,
  ],
  templateUrl: './fancy-todos.component.html',
  styleUrl: './fancy-todos.component.scss',
})
export class FancyTodosComponent implements OnInit {
  todos = this.todosService.todos;

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'createdAt',
    'modifiedAt',
  ];

  constructor(protected todosService: FancyTodosService) {}

  ngOnInit() {
    this.todosService.sorting.set({
      active: '',
      direction: '',
    });
  }

  handleChangeStatus(todo: ITodoListItem) {
    console.log(todo);
    const update = { ...todo, status: todo.status === 0 ? 2 : 0 };
    this.todosService.updateTodo(update);
  }
}
