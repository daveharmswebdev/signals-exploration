import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.scss',
})
export class CreateDialogComponent {
  todoForm = this.fb.group({
    title: '',
    description: '',
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateDialogComponent>
  ) {}

  submit() {
    this.dialogRef.close(this.todoForm.value);
  }
}
