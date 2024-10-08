import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-channel-management',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './channel-management.component.html',
  styleUrls: ['./channel-management.component.css']
})
export class ChannelManagementComponent {
  channelName = '';
  channels: string[] = [];
  currentUser: any;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.channels = this.currentUser.channels || [];
  }

  createChannel() {
    this.channels.push(this.channelName);  // Add to channels array
    this.channelName = '';  // Clear the input field
  }

  deleteChannel(channel: string) {
    this.channels = this.channels.filter(c => c !== channel);  // Remove the channel
  }

  updateUserData() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.username === this.currentUser.username);
    users[userIndex].channels = this.channels;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }
}
