import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public user: User;

  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus(): void {
    this.socket.on('connect', () => {
      console.log('Connect to Socket Server...');
      this.socketStatus = true;
      this.loadStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnect from Socket Server...');
      this.socketStatus = false;
    });
  }

  emit(event: string, payload?: any, callback?: Function): void {
    console.log('Emiting event...');
    this.socket.emit(event, payload, callback);
  }

  listen(event: string): Observable<any> {
    console.log('Listening event...');
    return this.socket.fromEvent(event);
  }

  loginWebSocket(name: string): Promise<any> {
    const randomAvatar = this.randomAvatar(0, 8);

    return new Promise((resolve, reject) => {
      console.log('Configuring user...');
      this.emit('config-user', { name, avatar: randomAvatar }, (resp) => {
        this.user = new User(name, randomAvatar);
        this.saveStorage();
        resolve(true);
      });
    });
  }

  logoutWebSocket(): void {
    this.user = null;
    localStorage.removeItem('user');

    const payload = {
      name: 'Unknown',
      avatar: -1
    };

    this.emit('config-user', payload, () => {});
    this.router.navigateByUrl('');
  }

  getUser(): User {
    return this.user;
  }

  saveStorage(): void {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadStorage(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loginWebSocket(this.user.name);
    }
  }

  randomAvatar(bottom: number, top: number): number {
    const possibilities = top - bottom;
    let randomNumber = Math.random() * (possibilities + 1);
    randomNumber = Math.floor(randomNumber);
    console.log('Selected avatar: ', (bottom + randomNumber));
    return bottom + randomNumber;
  }
}
