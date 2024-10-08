import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  username = '';
  email = '';
  currentUser: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  // Remove the extra closing brace

  createUser() {
    const user = { username: this.username, email: this.email };
    localStorage.setItem('user', JSON.stringify(user));
    // Optionally, call a backend API to save the user
    this.router.navigate(['/dashboard']);  // Redirect to dashboard after account creation
  }

    const newUser = {
      id: users.length + 1,
      username: this.username,
      email: this.email,
      roles: ['User'],  // Default role
      groups: []        // Groups will be empty initially
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));  // Set logged in user

    alert('User created successfully');
    this.router.navigate(['/dashboard']);
  }

  deleteAccount() {
    // Clear the current user from localStorage
    localStorage.removeItem('user');
    this.currentUser = null;
    this.router.navigate(['/login']);  // Redirect after account deletion
  }
}
