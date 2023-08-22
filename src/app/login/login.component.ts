import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const userName = this.loginForm.value.userName!;
      const password = this.loginForm.value.password!;

      this.authService.login(userName, password).subscribe((payLoad) => {
        if (payLoad) {
          this.router.navigate(['/restaurants']);
        }
      });
    }
  }
}
