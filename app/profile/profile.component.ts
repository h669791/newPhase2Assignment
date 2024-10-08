import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username = '';
  email = '';
  currentUser: any;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = this.currentUser.username;
    this.email = this.currentUser.email;
  }

  updateProfile() {
    const updatedUser = { username: this.username, email: this.email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    console.log('Profile updated:', updatedUser);
  }
  

  updateUserData() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.username === this.currentUser.username);
    users[userIndex] = this.currentUser;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }
}
