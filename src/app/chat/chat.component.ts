import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {Chat} from "./chat";
import {ActivatedRoute} from '@angular/router';
import {ChatService} from "./chat.service";
import {environment} from "../../environments/environment";
import {SecurityRolesService} from "../security-roles.service";

@Component({
  selector: 'app-root',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private serverUrl = environment.baseURL + '/socket';
  private title = 'WebSockets chat';
  private stompClient;
  public chat = new Chat();
  public userId: any;
  public messageTo: any;
  public messageFrom: any;
  public sent: any;
  public chats: Chat [];
  public man1 = environment.baseURL +"/customers/image/man1";
  public man2 = environment.baseURL +"/customers/image/man2";
  constructor(private chatService: ChatService, private rout: ActivatedRoute, private src: SecurityRolesService) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
    this.getChats();
  }

  initializeWebSocketConnection() {
    this.rout.params.subscribe(next => {
      let usr = next.id;
      console.log("USR "+usr);
      this.messageTo = usr;
      this.userId = "20002";
      this.messageFrom = this.src.getUserId();
      console.log(this.src.getUserId());
      this.sent = next.sentBy;
      console.log("messageTo: "+ this.messageTo);
      console.log("messageFrom: "+ this.messageFrom);

    }, err => {
      console.log(err);
    });
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/chat", (message) => {
        that.getChats();
        if (message.body) {
          that.getChats();
        }
      });
    });
  }

  sendMessage(message) {
    this.chat.message = message;
    this.chat.providerId = this.userId;
    this.chat.customerId = '1';
    this.chat.messageTo = this.messageTo;
    this.chat.messageFrom = this.messageFrom;
    this.chat.sentBy = this.sent;
    console.log("CHATmessageTo: "+ this.chat.messageTo);
    console.log("CHATmessageFrom: "+ this.chat.messageFrom);
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

}
