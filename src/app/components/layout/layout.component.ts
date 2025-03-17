import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [DashboardComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
