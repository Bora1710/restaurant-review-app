import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterApiService } from '../services/register-api.service';

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

  constructor(private registerService: RegisterApiService) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const userName = this.registerForm.value.userName as string;
      const password = this.registerForm.value.password as string;
      const role = 2 as number;

      this.registerService
        .register(userName, password, role)
        .subscribe((payLoad) => {});
    }
  }
}
