import {Component, signal} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import { MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  counter: number = 0;
  counterSubject = new BehaviorSubject<number>(0);
  counterSignal = signal(0)

  increment() {
    this.counter++;
  }

  incrementBehaviorSubject() {
    this.counterSubject.next(this.counterSubject.value + 1);
  }

  incrementSignalCount() {
    this.counterSignal.update(val => val + 1)
  }
}
