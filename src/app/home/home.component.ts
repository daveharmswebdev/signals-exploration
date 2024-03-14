import { Component } from '@angular/core';
import { CounterComponent } from '../counter/counter.component';
import { ObjectsArraysComponent } from '../objects-arrays/objects-arrays.component';
import { ComputeExampleComponent } from '../compute-example/compute-example.component';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CounterComponent,
    ObjectsArraysComponent,
    ComputeExampleComponent,
    TodosComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
