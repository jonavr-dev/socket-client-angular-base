import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Output()
  myAvatar = new EventEmitter<number>();
  activeUsersObs: Observable<any>;
  selectedAvatar = '';
  avatars = [
    'assets/animals_01.jpg',
    'assets/animals_02.jpg',
    'assets/animals_03.jpg',
    'assets/animals_04.jpg',
    'assets/animals_05.jpg',
    'assets/animals_06.jpg',
    'assets/animals_07.jpg',
    'assets/animals_08.jpg',
    'assets/animals_09.jpg'
  ];

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.activeUsersObs = this.chatService.getActiveUsers();
    this.chatService.emitActiveUsers();
  }
}
