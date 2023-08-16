import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginApiService } from '../services/login-api.service';

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

  constructor(private loginService: LoginApiService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const userName = this.loginForm.value.userName!;
      const password = this.loginForm.value.password!;

      this.loginService.login(userName, password).subscribe((payLoad) => {});
    }
  }
}
