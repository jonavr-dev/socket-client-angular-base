import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {User} from '../../models/user';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
  message = '';
  messageSubscription: Subscription;
  messages: any[] = [];
  commentsWindow: HTMLElement;
  userConnected: User;

  constructor(
      private chatService: ChatService,
      private wsService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.commentsWindow = document.getElementById('comments-messages');

    this.messageSubscription = this.chatService.getMessage()
        .subscribe(message => {
          console.log('Received message ===> ', message);
          this.messages.push(message);
          setTimeout(() => {
            this.commentsWindow.scrollTop = this.commentsWindow.scrollHeight;
          }, 0);
        });

    setTimeout(() => {
      this.userConnected = this.wsService.getUser();
    }, 300);
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  send(): void {
    if (this.message.trim().length > 0) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }
}
