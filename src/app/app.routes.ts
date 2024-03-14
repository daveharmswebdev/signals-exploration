import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoTableComponent } from './todo-table/todo-table.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todo-table', component: TodoTableComponent },
];
