import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Restaurant-review-app';
  constructor(private authService: AuthenticationService) {
    if (localStorage.getItem('token')) {
      this.authService
        .userInfoFromToken(localStorage.getItem('token')!)
        .subscribe();
    }
  }
}
