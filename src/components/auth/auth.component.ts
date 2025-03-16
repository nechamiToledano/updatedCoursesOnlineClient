import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  imports: [HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private router: Router){}
  
  signIn(){
    this.router.navigate(['/sign-in']);
  }
  signUp(){
    this.router.navigate(['/sign-up']);
  }
}
