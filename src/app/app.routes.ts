import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { FancyTodosComponent } from './fancy-todos/fancy-todos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todo-table', component: TodoTableComponent },
  { path: 'fancy-todos', component: FancyTodosComponent },
];
