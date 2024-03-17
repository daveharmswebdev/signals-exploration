import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { FancyTodosComponent } from './fancy-todos/fancy-todos.component';
import { ChangeDetectionDemoComponent } from './change-detection-demo/change-detection-demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'change', component: ChangeDetectionDemoComponent },
  { path: 'todo-table', component: TodoTableComponent },
  { path: 'fancy-todos', component: FancyTodosComponent },
];
