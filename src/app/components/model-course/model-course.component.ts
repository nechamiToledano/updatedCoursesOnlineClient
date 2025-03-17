import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-model-course',
  imports: [ MatFormFieldModule,MatDialogModule,FormsModule,ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './model-course.component.html',
  styleUrl: './model-course.component.css'
})
export class ModelCourseComponent {
  courseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModelCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: any },
    private fb: FormBuilder
  ) {
    this.courseForm = this.fb.group({
      title: [data.course.title, Validators.required],
      description: [data.course.description, Validators.required]
    });
  }

  onSave(): void {
    if (this.courseForm.valid) {
      this.dialogRef.close(this.courseForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
