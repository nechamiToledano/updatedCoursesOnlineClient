import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatOptionModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatIconModule, MatSnackBarModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  enrolledCourseIds: number[] = [];
  userId: any;

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.courseService.getCourses(localStorage.getItem('token')!).subscribe((data: any[]) => {
      this.courses = data;
    });
    if (typeof window !== 'undefined' && window.localStorage) {

      this.userId = localStorage.getItem('userId');
    }
    // Fetch the courses the user is enrolled in
    this.courseService.getCoursesByStudentId(this.userId).subscribe((enrolledCourses: any[]) => {
      this.enrolledCourseIds = enrolledCourses.map(course => course.id);
    });

  }

  courseDetailes(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  enroll(courseId: number): void {
    if (this.enrolledCourseIds.includes(courseId)) {
      this.showMessage('❌ אתה כבר רשום לקורס זה.');
      return;
    }

    this.courseService.enrollInCourse(courseId,this.userId).subscribe(
      () => {
        this.enrolledCourseIds.push(courseId);
        this.showMessage('✅ נרשמת בהצלחה לקורס!');
      },
      (error) => {
        this.showMessage('❌ שגיאה בהרשמה לקורס.');
        console.error('Enrollment failed', error);

      }
    );
  }

  leave(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.showMessage('❌ אינך רשום לקורס זה.');
      return;
    }
    this.courseService.leaveCourse(courseId,this.userId).subscribe(
      () => {
        this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
        this.showMessage('❌ עזבת את הקורס בהצלחה.');
      },
      (error) => {
        this.showMessage('❌ שגיאה בעזיבת לקורס.');
        console.error('Leave failed', error);
      }
    );
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'סגור', {
      duration: 3000, // 3 שניות
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}