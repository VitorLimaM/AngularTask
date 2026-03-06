import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Usuário e senha fixos
  private readonly USER_EMAIL = 'teste@email.com';
  private readonly USER_PASSWORD = '123456';

  constructor(private router: Router) {}

  login(email: string, password: string) {
    if (email === this.USER_EMAIL && password === this.USER_PASSWORD) {
      localStorage.setItem('logged', 'true');
      this.router.navigate(['/home']);
    } else {
      alert('Invalid login');
    }
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return localStorage.getItem('logged') === 'true';
  }
}