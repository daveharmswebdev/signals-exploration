import { Component, inject } from '@angular/core';
import { FancyTodosService } from './fancy-todos.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StatusCardComponent } from '../status-card/status-card.component';
import { ITodoListItem } from '../models/ITodo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateDialogComponent } from '../todos/create-dialog/create-dialog.component';

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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './fancy-todos.component.html',
  styleUrl: './fancy-todos.component.scss',
})
export class FancyTodosComponent {
  protected todosService = inject(FancyTodosService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'createdAt',
    'action',
  ];

  handleChangeStatus(todo: ITodoListItem) {
    console.log(todo);
    const update = { ...todo, status: todo.status === 0 ? 2 : 0 };
    this.todosService.updateTodo(update);
  }

  delete(todo: ITodoListItem) {
    console.log('delete', todo);
    this.todosService.delete(todo);
  }

  launchCreateTodo() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '300px',
      height: '400px',
    });
    dialogRef
      .afterClosed()
      .subscribe(todo => this.todosService.createTodo(todo));
  }
}
