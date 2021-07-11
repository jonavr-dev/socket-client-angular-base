import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.css']
})
export class ReactionsComponent implements OnInit {
  reactionSubscription: Subscription;
  reactions = {
    loveit: 0,
    applause: 0,
    doubt: 0
  };

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.reactionSubscription = this.chatService.getReaction()
      .subscribe(reactions => {
        console.log('Received reactions ===> ', reactions);
        this.reactions = reactions;

        this.animate(reactions.change);
      });

    this.getReactions();
  }

  getReactions(): void {
    this.chatService.getReactions()
      .subscribe(response => {
        if (response.ok) {
          console.log('Service reactions ===> ', response.reactions);
          this.reactions = response.reactions;
        }
      });
  }

  animate(type: string): void {
    switch (type) {
      case 'loveit':
        document.getElementById('loveit').setAttribute('class', 'col reaction pulse');
        setTimeout(() => {
          document.getElementById('loveit').setAttribute('class', 'col reaction');
        }, 200);
        break;

      case 'applause':
        document.getElementById('applause').setAttribute('class', 'col reaction pulse');
        setTimeout(() => {
          document.getElementById('applause').setAttribute('class', 'col reaction');
        }, 200);
        break;

      case 'doubt':
        document.getElementById('doubt').setAttribute('class', 'col reaction pulse');
        setTimeout(() => {
          document.getElementById('doubt').setAttribute('class', 'col reaction');
        }, 200);
        break;
    }
  }

  send(reaction: string): void {
    this.chatService.sendReaction(reaction);
  }
}
