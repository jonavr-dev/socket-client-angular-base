import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {ChatService} from '../../services/chat.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = '';
  messageSubscription: Subscription;
  messages: any[] = [];
  chatWindow: HTMLElement;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatWindow = document.getElementById('chat-messages');

    this.messageSubscription = this.chatService.getMessage()
      .subscribe(message => {
        console.log('Received message ===> ', message);
        this.messages.push(message);
        setTimeout(() => {
          this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
        }, 0);
      });
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
