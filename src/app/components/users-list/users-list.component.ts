import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {WebsocketService} from '../../services/websocket.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  activeUsersObs: Observable<any>;
  connectedUser: User;
  configuredUser = false;

  constructor(
    public chatService: ChatService,
    public wsService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.activeUsersObs = this.chatService.getActiveUsers();

    this.activeUsersObs
        .subscribe(list => {
          if (!this.configuredUser) {
            this.connectedUser = {
              id: list[list.length - 1].id,
              name: list[list.length - 1].name,
            };

            this.wsService.setUser(this.connectedUser);

            this.configuredUser = true;
          }
        });

    this.chatService.emitActiveUsers();
  }
}
