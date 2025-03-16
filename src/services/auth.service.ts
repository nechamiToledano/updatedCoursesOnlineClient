import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient) { }
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return token
    ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
    : new HttpHeaders();  }

  getUserId(): number | null {
    
    const userId = localStorage.getItem('userId');
    return userId ? JSON.parse(userId) : null;
  }


  register(name: string, email: string, password: string, role: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = { name, email, password, role };
    return this.http.post(url, body);
  }

  // login(email: string, password: string): Observable<any> {
  //   const url = `${this.apiUrl}/login`;
  //   const body = { email, password };
  //   return this.http.post(url, body);
  // }

//   login(email: string, password: string): Observable<any> {
//     const url = `${this.apiUrl}/login`;
//     const body = { email, password };
//     return this.http.post(url, body).pipe(
//         tap(response => {
//             if (response.token) {
//                 this.setToken(response.token); // שמור את ה-Token
//             }
//         })
//     );
// }
login(email: string, password: string): Observable<any> {
  const url = `${this.apiUrl}/login`;
  const body = { email, password };
  return this.http.post<any>(url, body).pipe(
      tap(response => {
          if (response.token) {
              this.setToken(response.token); // שמור את ה-Token
          }
      })
  );
}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getRole() {
    return localStorage.getItem('role');
  }

  // getEnrolledCourses(): Observable<number[]> {
  //   return this.http.get<number[]>(`${this.apiUrl}/enrolled-courses`);
  // }
  
}


// removeToken() {
//   localStorage.removeItem('token');
// }