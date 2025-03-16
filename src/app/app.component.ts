import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UpdatedCoursesOnlineClient';
}

// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'] // שים לב לתקן ל-styleUrls
// })
// export class AppComponent {
//   title = 'UpdatedCoursesOnlineClient';
// }
