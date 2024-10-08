// src/app/channel-management/channel-management.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-channel-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Channel Management</h2>
    <form (ngSubmit)="createChannel()">
      <label for="channelName">Channel Name:</label>
      <input id="channelName" [(ngModel)]="channelName" name="channelName" required />
      <button type="submit">Create Channel</button>
    </form>
    <ul>
      <li *ngFor="let channel of channels">{{ channel.name }}</li>
    </ul>
  `,
  styleUrls: ['./channel-management.component.css']
})
export class ChannelManagementComponent implements OnInit {
  channelName = '';
  channels: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadChannels();
  }

  loadChannels() {
    this.http.get<any[]>('/api/channels').subscribe(channels => {
      this.channels = channels;
    });
  }

  createChannel() {
    this.http.post('/api/createChannel', { channelName: this.channelName }).subscribe(() => {
      this.loadChannels(); // Refresh channel list
      this.channelName = ''; // Clear input
    });
  }
}
