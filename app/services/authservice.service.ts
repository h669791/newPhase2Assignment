import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // Your backend URL

  constructor(private http: HttpClient) {}

  // Function to handle login
  login(username: string, password: string): boolean {
    // Placeholder logic for login, you can replace with an API call
    if (username === 'test' && password === 'password') {
      localStorage.setItem('user', JSON.stringify({ username }));
      return true;
    }
    return false;
  }

  // Store the token in localStorage when login is successful
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
  }
}
