import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,RouterLink,MatDividerModule,MatListModule],
 templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  isLoggedIn: boolean = false;
  isTeacher: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {

    this.isLoggedIn = !!localStorage.getItem('token');
    this.isTeacher = localStorage.getItem('role') === 'teacher';
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {

    localStorage.clear();}
    window.location.reload();
    
  }
}