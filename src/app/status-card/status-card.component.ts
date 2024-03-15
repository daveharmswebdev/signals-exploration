import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-status-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './status-card.component.html',
  styleUrl: './status-card.component.scss',
})
export class StatusCardComponent {
  status = input.required({
    transform: (status: number) => (status === 0 ? 'New' : 'Completed'),
  });

  @Output()
  changeStatus = new EventEmitter<void>();
}
