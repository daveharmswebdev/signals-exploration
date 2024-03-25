import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { ICourse } from '../objects-arrays/objects-arrays.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-compute-example',
  standalone: true,
  imports: [MatButtonModule, JsonPipe, CourseCardComponent, MatCardModule],
  templateUrl: './compute-example.component.html',
  styleUrl: './compute-example.component.scss',
})
export class ComputeExampleComponent implements OnInit {
  // courses: Signal<ICourse[]> = toSignal(this.courseService.getCourses(), {
  //   initialValue: [],
  // });  creates a readonly signal, can't do this to create a writable signal

  courses = signal<ICourse[]>([]);

  derivedCourses = computed<ICourse[]>(() => {
    const courses = this.courses();

    return courses?.map(
      course =>
        ({
          ...course,
          color: course.completed ? 'green' : 'red',
        }) || []
    );
  });

  constructor(private courseService: CoursesService) {
    effect(() => {
      const derivedCourses = this.derivedCourses();

      this.courseService.updateCourses(derivedCourses);
    });
  }

  ngOnInit() {
    this.courseService
      .getCourses()
      .subscribe(courses => this.courses.set(courses));
  }

  complete(courseId: number) {
    this.courses.update(courses =>
      courses.map(c => ({
        ...c,
        completed: c.id === courseId ? !c.completed : c.completed,
      }))
    );
  }
}
