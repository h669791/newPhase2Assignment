// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../services/socket.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <h2>Your Channels</h2>
    <ul>
      <li *ngFor="let channel of channels" (click)="joinChannel(channel.id)">{{ channel.name }}</li>
    </ul>
  `,
  imports: [CommonModule] // Required for *ngFor and other common directives
})
export class DashboardComponent implements OnInit {
  channels = [{ id: '1', name: 'General' }];

  constructor(private socketService: SocketService) {}

  ngOnInit() {}

  joinChannel(channelId: string) {
    this.socketService.joinChannel(channelId);
  }
}
