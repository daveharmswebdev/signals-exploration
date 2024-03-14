import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ObjectsArraysComponent } from './objects-arrays/objects-arrays.component';
import { ComputeExampleComponent } from './compute-example/compute-example.component';
import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CounterComponent,
    AsyncPipe,
    MatButtonModule,
    ObjectsArraysComponent,
    ComputeExampleComponent,
    TodosComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-app';
}
