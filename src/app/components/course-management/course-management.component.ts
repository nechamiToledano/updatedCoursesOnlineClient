import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { CourseManagementService } from "../../../services/course-management.service";
import { CourseService } from "../../../services/courses.service";
import { ModelCourseComponent } from "../model-course/model-course.component";
@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [MatFormFieldModule, MatToolbarModule, MatCardModule, FormsModule, ReactiveFormsModule, 
    MatInputModule, MatButtonModule, RouterModule
  ],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseManagementComponent implements OnInit {
  courses: any[] = [];
  newCourse: any = { title: '', description: '' };

  constructor(private courseService: CourseService, private snackBar: MatSnackBar, private dialog: MatDialog, private courseManagementService: CourseManagementService) {}

  ngOnInit(): void {
    this.loadCourses();
  }
  
  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: any[]) => {
      this.courses = data;
    }, (error) => {
      this.showSnackbar('Error loading courses.', 'Close');
      console.error('Error loading courses:', error);
    });
  }
  

  addCourse(): void {
    const dialogRef = this.dialog.open(ModelCourseComponent, {
      data: { course: { ...this.newCourse } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseManagementService.addCourse(result).subscribe(() => {
          this.loadCourses();
          this.showSnackbar("✅ Course added successfully!", "Close");
          this.newCourse = { title: '', description: '' };
        });
      }
    });
  }
  editCourse(course: any): void {
    const dialogRef = this.dialog.open(ModelCourseComponent, {
      data: { course: { ...course } }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // ודא שאתה שולח את הנתונים בצורה הנכונה עם המפתחות title ו-description
        const updatedCourse = {
          title: result.title,  // לוודא ששולחים את שם הקורס
          description: result.description  ,
          id:course.id
        };
  console.log(updatedCourse);
  
        this.courseManagementService.updateCourse(course.id, updatedCourse).subscribe(() => {
          this.loadCourses();  // רענן את רשימת הקורסים לאחר העדכון
          this.showSnackbar("✅ Course updated successfully!", "Close");
        }, (error) => {
          this.showSnackbar("Error updating course", "Close");
          console.error('Error updating course:', error);
        });
      }
    });
  }
  
  
  deleteCourse(courseId: number): void {
    this.courseManagementService.deleteCourse(courseId).subscribe(() => {
      this.loadCourses();
      this.showSnackbar("🗑 Course deleted successfully!", "Close");
    });
  }

  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}