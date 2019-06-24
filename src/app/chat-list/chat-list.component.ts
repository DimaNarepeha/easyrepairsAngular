import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {Http, Response} from "@angular/http";
import {Chat} from "../chat/chat";
import {NotifierService} from "angular-notifier";
import {SecurityRolesService} from "../security-roles.service";
import {ChatService} from "../chat/chat.service";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  url = environment.baseURL + "/service-providers/image/";
  chatsForUser:Chat[];
  id:any;
  c:any;
  cs: ChatService;
  constructor(private chatService: ChatService, private httpService: Http, private src: SecurityRolesService) {
 this.cs = this.chatService;
  }

  ngOnInit() {
    this.id = this.src.getUserId();
    this.getMessagesForAUser(this.id);
  }
  getMessagesForAUser(sendFrom: any) {
    this.httpService.get(environment.baseURL + "/message/getMessagesForUser/" + sendFrom).map((response: Response) => response.json())
      .subscribe((response) => {
        console.log(response);
        this.chatsForUser = response;



      });

  }

}
