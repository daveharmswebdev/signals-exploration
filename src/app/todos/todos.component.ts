import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { JsonPipe } from '@angular/common';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { ITodo } from '../models/ITodo';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [JsonPipe, TodoCardComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todos = this.todosService.todos;

  constructor(private todosService: TodoService) {}

  ngOnInit(): void {
    this.todosService.getTodos();
  }

  completeTodo(todo: ITodo) {
    this.todosService.updateTodo(todo);
  }
}
