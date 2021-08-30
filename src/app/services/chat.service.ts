import { Injectable } from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private wsService: WebsocketService
  ) { }

  emitActiveUsers(): void {
    this.wsService.emit('get-users');
  }

  sendMessage(message: string): void {
    const payload = {
      from: this.wsService.getUser(),
      body: message
    };

    this.wsService.emit('message', payload);
  }

  getActiveUsers(): Observable<any> {
    return this.wsService.listen('active-users');
  }

  getMessage(): Observable<any> {
    return this.wsService.listen('new-message');
  }
}
