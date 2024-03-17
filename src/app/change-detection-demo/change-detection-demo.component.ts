import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { ITodoListItem } from '../models/ITodo';
import { TodoService } from '../services/todo.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-change-detection-demo',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './change-detection-demo.component.html',
  styleUrl: './change-detection-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetectionDemoComponent implements OnInit {
  // todos: ITodoListItem[] = [];
  // todos$ = new BehaviorSubject<ITodoListItem[]>([]);
  todosSignal = signal<ITodoListItem[]>([]);

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    // this.todoService.plainGetTodos().subscribe(todos => (this.todos = todos));
    // this.todoService
    //   .plainGetTodos()
    //   .subscribe(todos => this.todos$.next(todos));
    this.todoService
      .plainGetTodos()
      .subscribe(todos => this.todosSignal.set(todos));
  }
}
