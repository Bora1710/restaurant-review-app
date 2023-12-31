import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const userName = this.registerForm.value.userName as string;
      const password = this.registerForm.value.password as string;
      const role = 2 as number;

      this.authService
        .register(userName, password, role)
        .subscribe((payLoad) => {
          payLoad ? this.router.navigate(['/login']) : null;
        });
    }
  }
}
