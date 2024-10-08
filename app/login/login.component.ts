// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="onLogin()">
      <label for="username">Username:</label>
      <input id="username" [(ngModel)]="username" name="username" required />
      
      <label for="password">Password:</label>
      <input id="password" [(ngModel)]="password" name="password" type="password" required />
      
      <button type="submit">Login</button>
    </form>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
