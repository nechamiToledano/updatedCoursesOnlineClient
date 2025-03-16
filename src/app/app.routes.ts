import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ListOfCourses } from './components/list-of-courses/list-of-courses.component';
import { CourseManagementComponent } from './components/course-management/course-management.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';


export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  {
    path: '',
    component: LayoutComponent, // ✅ Wrap pages inside LayoutComponent
    children: [
      { path: 'auth', component: AuthComponent },
      { path:'sign-in', component: SignInComponent },
      { path:'sign-up', component: SignUpComponent },
      { path: 'list-of-courses', component: ListOfCourses, canActivate: [AuthGuard] },
      { path: 'course-management', component: CourseManagementComponent, canActivate: [AuthGuard] },
     

    ],
  },];
