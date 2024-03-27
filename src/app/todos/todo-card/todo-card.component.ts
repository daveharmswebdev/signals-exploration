import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ITodoListItem } from '../../models/ITodo';
import { MatButtonModule } from '@angular/material/button';
import { TodoStatus } from '../../models/TodoStatus';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  todo = input.required<ITodoListItem>();
  completeTodo = output<ITodoListItem>();

  get buttonText() {
    return this.todo().status === 2 ? 'Undo Complete' : 'Complete';
  }

  constructor() {
    // effect(() => {
    //   const todo = this.todo();
    //
    //   console.log('i changed', todo);
    // });
  }

  public complete(todo: ITodoListItem): void {
    const status =
      todo.status === TodoStatus.New ? TodoStatus.Completed : TodoStatus.New;
    const completedTodo = { ...todo, status };
    this.completeTodo.emit(completedTodo);
  }
}
