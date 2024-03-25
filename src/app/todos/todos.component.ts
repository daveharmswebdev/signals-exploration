import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { JsonPipe } from '@angular/common';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { ITodoListItem } from '../models/ITodo';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [JsonPipe, TodoCardComponent, MatCardModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todos = this.todosService.todos;

  constructor(private todosService: TodoService) {}

  ngOnInit(): void {
    this.todosService.getTodos();
  }

  completeTodo(todo: ITodoListItem) {
    this.todosService.updateTodo(todo);
  }
}
