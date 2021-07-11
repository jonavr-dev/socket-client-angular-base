import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showList = true;
  username = '';

  constructor(
    public wsService: WebsocketService
  ) { }

  ngOnInit(): void {
  }

  setShowStatus(state: boolean): void {
    this.showList = state;
  }
}
