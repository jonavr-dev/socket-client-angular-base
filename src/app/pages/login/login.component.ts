import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = '';

  constructor(
    private wsService: WebsocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.wsService.loginWebSocket(this.name)
      .then(() => {
        this.router.navigateByUrl('/dashboard');
      })
      .catch()
      .finally();
  }
}
