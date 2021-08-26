import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public user: User;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
  }

  checkStatus(): void {
    this.socket.on('connect', () => {
      console.log('Connect to Socket Server...');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnect from Socket Server...');
      this.socketStatus = false;
    });
  }

  // tslint:disable-next-line:ban-types
  emit(event: string, payload?: any, callback?: Function): void {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string): Observable<any> {
    return this.socket.fromEvent(event);
  }

  setUser(userValues: User): void {
    this.user = userValues;
  }

  getUser(): User {
    return this.user;
  }
}
