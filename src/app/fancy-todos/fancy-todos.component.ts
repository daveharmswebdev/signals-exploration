import { Component, effect, OnInit } from '@angular/core';
import { FancyTodosService } from './fancy-todos.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StatusCardComponent } from '../status-card/status-card.component';
import { ITodoListItem } from '../models/ITodo';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';

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
  ],
  templateUrl: './fancy-todos.component.html',
  styleUrl: './fancy-todos.component.scss',
})
export class FancyTodosComponent implements OnInit {
  todos = this.todosService.todos;

  searchControl = new FormControl('');
  searchSignal = toSignal(this.searchControl.valueChanges);

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'createdAt',
    'modifiedAt',
  ];

  constructor(protected todosService: FancyTodosService) {
    effect(
      () => {
        const searchString = this.searchSignal();

        if (searchString) {
          this.todosService.search(searchString);
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.todosService.sorting.set({
      active: '',
      direction: '',
    });

    const initialSearchString = this.todosService.searching();

    this.searchControl.setValue(initialSearchString, { emitEvent: false });
  }

  handleChangeStatus(todo: ITodoListItem) {
    console.log(todo);
    const update = { ...todo, status: todo.status === 0 ? 2 : 0 };
    this.todosService.updateTodo(update);
  }
}
