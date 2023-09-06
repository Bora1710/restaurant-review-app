import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Restaurant-review-app';
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    if (localStorage.getItem('token')) {
      this.authService
        .userInfoFromToken(localStorage.getItem('token')!)
        .subscribe((payLoad) => {
          if (payLoad) {
            this.router.navigate(['/restaurants']);
          }
        });
    }
  }
}
