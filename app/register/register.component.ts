// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Register</h2>
    <form (ngSubmit)="register()">
      <label for="username">Username:</label>
      <input id="username" [(ngModel)]="username" name="username" required />
      
      <label for="password">Password:</label>
      <input id="password" [(ngModel)]="password" name="password" type="password" required />
      
      <button type="submit">Register</button>
    </form>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient) {}

  register() {
    this.http.post('/api/register', { username: this.username, password: this.password }).subscribe(response => {
      console.log('User registered:', response);
    });
  }
}
