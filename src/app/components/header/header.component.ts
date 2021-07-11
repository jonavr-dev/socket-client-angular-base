import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() showAction = new EventEmitter<boolean>();
  showList = true;
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
    public wsService: WebsocketService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.wsService.logoutWebSocket();
  }

  showUserList(): void {
    this.showList = !this.showList;
    this.showAction.emit(this.showList);
  }
}
