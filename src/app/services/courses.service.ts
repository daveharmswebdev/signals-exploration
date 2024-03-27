import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICourse } from '../objects-arrays/objects-arrays.component';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  getCourses(): Observable<ICourse[]> {
    return of([
      {
        id: 15,
        title: 'Red Course',
        completed: false,
      },
      {
        id: 16,
        title: 'Blue Course',
        completed: false,
      },
    ]);
  }

  updateCourses(courses: ICourse[]) {
    console.log('updated', courses);
  }
}
