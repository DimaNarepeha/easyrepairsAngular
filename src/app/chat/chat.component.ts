import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {Chat} from "./chat";
import {ActivatedRoute} from '@angular/router';
import {ChatService} from "./chat.service";
import {environment} from "../../environments/environment";
import {SecurityRolesService} from "../security-roles.service";
import {UserDTO} from "./userDTO";

@Component({
  selector: 'app-root',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  url = environment.baseURL + "/service-providers/image/";
  private serverUrl = environment.baseURL + '/socket';
  private title = 'WebSockets chat';
  private stompClient;
  public chat = new Chat();
  public userId: any;
  public messageTo: any;
  public messageFrom: any;
  public sent: any;
  public chats: Chat [];
  public unreadChats: Chat [];
  public unreadChatsForUser: Chat [];

  constructor(private chatService: ChatService, private rout: ActivatedRoute, private src: SecurityRolesService) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
    this.getChats();
    this.getUnreadForUser();
  }

  initializeWebSocketConnection() {
    this.rout.params.subscribe(next => {
      this.messageTo = next.id;
      this.messageFrom = this.src.getUserId();
      this.sent = next.sentBy;
      this.getUnreadChats();
      this.readChats();
    }, err => {
      console.log(err);
    });
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/chat", (message) => {
        that.getChats();
        that.getUnreadChats();
        that.readChats();
        that.getChats();
        if (message.body) {
          that.getUnreadChats();
          that.readChats();
          that.getChats();
        }
      });
    });
  }

  sendMessage(message) {
    this.chat.message = message;
    this.chat.providerId = this.userId;
    this.chat.customerId = '1';
    this.chat.messageTo = new UserDTO();
    this.chat.messageFrom = new UserDTO();
    this.chat.messageTo.id = this.messageTo;
    this.chat.messageFrom.id = this.messageFrom;
    this.chat.sentBy = this.sent;
    this.chatService.addChat(this.chat).subscribe((response) => {
      console.log(response);
      this.getChats();
    });

    this.stompClient.send("/app/send/message", {}, message);
    $('#input').val('');
  }

  getChats() {
    this.chatService.getAllChats(this.messageTo, this.messageFrom).subscribe((response) => {
      this.chats = response;
    });
  }

  getUnreadChats() {
    this.chatService.getUnreadMessages(this.messageTo, this.messageFrom).subscribe((response) => {
      this.unreadChats = response;
    });
  }

  readChats() {
    this.chatService.readMessages(this.messageTo, this.messageFrom).subscribe((response) => {
    });
  }

  getUnreadForUser() {
    this.chatService.getUnreadMessagesForAUser(this.messageTo).subscribe((response) => {
      console.log(response);
      this.unreadChatsForUser = response;
    });
  }

}
