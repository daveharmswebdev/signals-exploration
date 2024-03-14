import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ITodo } from '../../models/ITodo';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() todo!: ITodo;
  @Output() completeTodo = new EventEmitter<ITodo>();

  public complete(todo: ITodo): void {
    const completedTodo = { ...todo, completed: !todo.completed };
    this.completeTodo.emit(completedTodo);
  }
}
