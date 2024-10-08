import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Check for browser environment before accessing localStorage
    if (isBrowser()) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }

  // Function to check if user has a specific role
  isRole(role: string): boolean {
    return this.user?.roles?.includes(role);
  }

  // Promote user to a new role
  promoteUser(userId: string, role: string) {
    this.http.post('/promote', { userId, role }).subscribe(response => {
      console.log(response);
    });
  }

  // Create a new group (only for Group Admins)
  createGroup() {
    this.http.post('/createGroup', { userId: this.user?.id, groupName: 'New Group' }).subscribe(response => {
      console.log(response);
    });
  }

  // Join a group (only for Chat Users)
  joinGroup() {
    this.http.post('/joinChannel', { userId: this.user?.id, channelId: 'some-channel-id' }).subscribe(response => {
      console.log(response);
    });
  }
}

// Utility function to check if the code is running in the browser
function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}
