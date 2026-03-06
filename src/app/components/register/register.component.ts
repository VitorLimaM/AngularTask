import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  template: `
    <h2>Register</h2>
    <p>O registro não é necessário neste projeto.</p>
    <p>Use os dados padrão:</p>
    <p><strong>Email:</strong> teste@email.com</p>
    <p><strong>Senha:</strong> 123456</p>
  `,
  styles: ['p { font-size: 14px; }']
})
export class RegisterComponent {}