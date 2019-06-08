import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {Chat} from "./chat";
import {ActivatedRoute} from '@angular/router';
import {ChatService} from "./chat.service";
import {environment} from "../../environments/environment";

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
  public sent: any;
  public chats: Chat [];

  constructor(private chatService: ChatService, private rout: ActivatedRoute) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
    this.getChats();
  }

  initializeWebSocketConnection() {
    this.rout.params.subscribe(next => {
      this.userId = "20002";
      this.sent = next.sentBy;

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
    this.chat.messageTo = this.userId;
    this.chat.messageFrom = '1';
    this.chat.sentBy = this.sent;

    this.chatService.addChat(this.chat).subscribe((response) => {
      console.log(response);
      this.getChats();
    });

    this.stompClient.send("/app/send/message", {}, message);

    $('#input').val('');
  }

  getChats() {
    this.chatService.getAllChats().subscribe((response) => {
      this.chats = response;
    });
  }

}
