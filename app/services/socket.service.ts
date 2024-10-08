// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket = io('http://localhost:3000');

  joinChannel(channelId: string) {
    this.socket.emit('joinChannel', channelId);
  }
}
