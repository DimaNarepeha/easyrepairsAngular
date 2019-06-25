import {Component, OnInit} from '@angular/core';
import {ProviderStatus} from '../../service-providers/service-provider.status';
import {ChatService} from "../chat.service";
import {Chat} from "../chat";


@Component({
  selector: 'app-root',
  templateUrl: './chats.html',
  styleUrls: ['./chats.css']
})
export class ChatsComponent implements OnInit {
  // providerStatus: typeof ProviderStatus;
  public chat: Chat [];
public cha: Chat;
  constructor(private chatService: ChatService) {}

  getChats() {
  /*  this.chatService.getAllChats().subscribe((response) => {
      this.chat = response;
    });*/
  }


  ngOnInit() {
    this.getChats();
    if (this.chat) {
      this.cha=(this.chat)[0];
    }
  }

}
