import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }
  signInForm: FormGroup | any;
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signInForm!.controls;
  }
  onSubmit() {
    this.authService.login(this.signInForm.value.email, this.signInForm.value.password).subscribe(
      (      response: any) => {
        // טיפול בתגובה מוצלחת
        console.log('Login successful', response);
        this.router.navigate(['list-of-courses']);

        // שמירת הטוקן או ניווט לדף אחר
      },
      (      error: any) => {
        // טיפול בשגיאות
        console.error('Login failed', error);
      }
    );
  }
}

//     ngOnInit() {
//     this.signInForm = new FormGroup({
//       email: new FormControl('', [Validators.required, Validators.email]),
//       password: new FormControl('', [Validators.required, Validators.minLength(6)])
//     this.signInForm = new FormGroup({
//       email: new FormControl('', [Validators.required, Validators.email]),
//       password: new FormControl('', [Validators.required, Validators.minLength(6)])
//     });
//   }
// }

