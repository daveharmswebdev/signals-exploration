import { Component, OnInit, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CoursesService } from '../services/courses.service';
import { toSignal } from '@angular/core/rxjs-interop';

export interface ICourse {
  id: number;
  title: string;
  completed: boolean;
  color?: string;
}

@Component({
  selector: 'app-objects-arrays',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './objects-arrays.component.html',
  styleUrl: './objects-arrays.component.scss',
})
export class ObjectsArraysComponent implements OnInit {
  course = signal<ICourse>({
    id: 0,
    title: 'My Course',
    completed: true,
  });

  courses = toSignal(this.courseService.getCourses());

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    // this.courses = signal<ICourse[]>([
    //   {
    //     id: 0,
    //     title: 'Your Course',
    //     completed: false,
    //   },
    //   {
    //     id: 1,
    //     title: 'Their Course',
    //     completed: false,
    //   },
    // ]);
    // this.courseService
    //   .getCourses()
    //   .subscribe(courses => this.courses.set(courses));
  }

  update() {
    this.course.set({
      id: 0,
      title: 'Your Course',
      completed: false,
    });
  }
}
