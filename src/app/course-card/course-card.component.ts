import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from '../objects-arrays/objects-arrays.component';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [JsonPipe, MatCardModule, MatButtonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  @Input() course!: ICourse;
  @Output() complete = new EventEmitter<number>();
}
