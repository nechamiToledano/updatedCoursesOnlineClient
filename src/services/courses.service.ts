import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  
  constructor(private http: HttpClient, private authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    return this.userService.getHeaders()

  }

  getCourses(): Observable<any> {
    const headers = this.getHeaders()
    return this.http.get(this.apiUrl, { headers });
  }

  getCourseById(courseId: number): Observable<any> {
    const headers = this.getHeaders()
    return this.http.get(`${this.apiUrl}/${courseId}`, { headers }); // ✅ Fixed
  }
  getCoursesByStudentId(studentId: number|undefined): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/${studentId}`);
  }
  enrollInCourse(courseId: number, userId: number): Observable<any> {
    console.log('User ID:', userId);  // הדפס את ה-User ID
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers });
  }
  

  leaveCourse(courseId: number, userId: number): Observable<any> {
    const headers = this.getHeaders()

    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, {
      headers,
      body: { userId }
    });  }


  downloadMaterial(courseId: number, lessonId: number): Observable<Blob> {
    const headers = this.getHeaders().set('Accept', 'application/octet-stream'); // ✅ Added Accept header
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}/material`, {
      headers,
      responseType: 'blob'
    });
  }
}