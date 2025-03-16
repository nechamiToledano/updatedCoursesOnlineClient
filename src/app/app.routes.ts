import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { ListOfCoursesComponent } from '../components/list-of-courses/list-of-courses.component';

export const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    {path: 'list-of-courses', component: ListOfCoursesComponent}
];
