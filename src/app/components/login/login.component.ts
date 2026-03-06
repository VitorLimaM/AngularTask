import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl('teste@email.com', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  login() {
    if (this.loginForm.invalid) {
      alert('Preencha todos os campos!');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email!.trim(), password!.trim());
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}