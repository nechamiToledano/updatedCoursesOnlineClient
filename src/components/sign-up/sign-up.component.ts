// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
// import { Component,OnInit  } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { UserRole } from '../../enums/user-role'; // הוסף את ה-ENUM
// import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common'; // הוסף CommonModule

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserRole } from '../../enums/user-role';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private authService: AuthService
  ,private router: Router) { }

  userRoles = Object.values(UserRole);
  signUpForm: FormGroup | any;

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signUpForm!.controls;
  }
  selectRole(role: UserRole) {
    this.signUpForm.patchValue({ role: role });
  }

  onSubmit() {
    this.authService.register(this.signUpForm.value.name,
      this.signUpForm.value.email,
      this.signUpForm.value.password,
      this.signUpForm.value.role).subscribe(
        response => {
          // טיפול בתגובה מוצלחת
          console.log('Registration successful', response);
          this.router.navigate(['list-of-courses']);
          // שמירת הטוקן או ניווט לדף אחר
        },
        error => {
          // טיפול בשגיאות
          alert(error);
          console.error('Registration failed', error);
        }
      );
  }
}


