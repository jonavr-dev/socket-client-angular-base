import { Injectable } from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private urlEndpoint = 'http://localhost:5000';

  constructor(
    private wsService: WebsocketService,
    private http: HttpClient
  ) { }

  sendMessage(message: string): void {
    const payload = {
      de: this.wsService.getUser().name,
      body: message
    };

    this.wsService.emit('message', payload);
  }

  getMessage(): Observable<any> {
    return this.wsService.listen('new-message');
  }

  sendReaction(reaction: string): void {
    const payload = {
      de: this.wsService.getUser().name,
      body: reaction
    };

    this.wsService.emit('reaction', payload);
  }

  getReaction(): Observable<any> {
    return this.wsService.listen('new-reaction');
  }

  getPrivateMessage(): Observable<any> {
    return this.wsService.listen('private-message');
  }

  getActiveUsers(): Observable<any> {
    return this.wsService.listen('active-users');
  }

  emitActiveUsers(): void {
    this.wsService.emit('get-users');
  }

  getReactions(): Observable<any> {
    return this.http.get<any>(this.urlEndpoint + '/reactions');
  }
}
