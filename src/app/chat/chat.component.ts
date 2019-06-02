// import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
//
// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
// import {Message} from "./message.model";
// import {ChatMessageInfoDTO} from "./chat-message.model";
// import {ChatService} from "./chat.service";
// import {DeleteMessageInfoDTO} from "./chat-message-delete.model";
//
//
// // import {DeleteMessageInfoDTO} from "../../model/chat-message-delete.model";
//
// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit, AfterViewChecked {
//
//   @Input() chatId: number;
//
//   @ViewChild('content') content: ElementRef;
//
//   serverUrl = "http://localhost:8080/ws/";
//   private stompClient;
//   currentAccountId: number;
//   msg: String;
//   messages: Message[] = [];
//   @ViewChild('scrollMe') private myScrollContainer: ElementRef;
//
//   chatMessageInfo: ChatMessageInfoDTO = new ChatMessageInfoDTO(null, null, null);
//
//   constructor(private chatService: ChatService/*, private authService: CustomAuthService*/) {
//   }
//
//   ngOnInit() {
//    // this.authService.getCurrentUser().subscribe(data => this.currentAccountId = data.id);
//     this.initializeWebSocketConnection();
//     this.chatService.getMessagesByChatId(this.chatId).subscribe(data => this.messages = data);
//     this.scrollToBottom();
//   }
//
//   ngAfterViewChecked() {
//     this.scrollToBottom();
//   }
//
//   scrollToBottom(): void {
//     try {
//       this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
//     } catch (err) {
//       console.log(err)
//     }
//   }
//
//   initializeWebSocketConnection() {
//     let ws = new SockJS(this.serverUrl);
//     this.stompClient = Stomp.over(ws);
//     let that = this;
//     this.stompClient.connect({}, function (frame) {
//       that.openSocket();
//     });
//   }
//
//   openSocket() {
//     this.stompClient.subscribe("/topic/messages/" + this.chatId, (message) => {
//       this.handleResult(message);
//     });
//   }
//
//   handleResult(message) {
//
//     if (message.body) {
//       if ("deleted" === message.body.toString().substr(11, 7)) {
//         let deletedMessage: DeleteMessageInfoDTO = JSON.parse(message.body);
//         this.messages.splice(this.messages.findIndex(mes => mes.id === deletedMessage.messageId), 1);
//       } else {
//         let messageResult: Message = JSON.parse(message.body);
//         this.messages.push(messageResult);
//       }
//     }
//   }
//
//   sendMessage(message: string) {
//     if (message) {
//       this.chatMessageInfo.chatId = this.chatId;
//       this.chatMessageInfo.accountId = this.currentAccountId;
//       this.chatMessageInfo.content = message;
//       console.log(message);
//       this.stompClient.send("/chat/send/message", {}, JSON.stringify(this.chatMessageInfo));
//     }
//   }
//
//   deleteMessage(mes) {
//     let isSubmit = confirm("Do you really want to delete a message?");
//     console.log(this.messages);
//     if (isSubmit) {
//       this.stompClient.send("/chat/delete/message", {}, JSON.stringify(new DeleteMessageInfoDTO(mes.chatId, mes.id, mes.senderId)));
//     }
//
//     console.log("delete message");
//   }
//
//   getImageString(id: number) {
//     return "http://localhost:8080/accounts/" + id + "/image";
//   }
//
//
// }
import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {CustomerService} from "../customer/customer.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Chat} from "./chat";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ChatService} from "./chat.service";
@Component({
  selector: 'app-root',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  implements OnInit {
  private serverUrl = 'http://localhost:8080/socket';
  private title = 'WebSockets chat';
  private stompClient;
  public chat = new Chat();
  public userId: any;
  public sent: any;
  public chats: Chat [];
  //public message:string;
  constructor(private chatService: ChatService,private rout: ActivatedRoute) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
    this.getChats();
  }
  initializeWebSocketConnection(){
    this.rout.params.subscribe(next => {
      console.log(next.id);
      this.userId = next.id;
      this.sent = next.sentBy;

    }, err => {
      console.log(err);
    });
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    let messsage = '';
      var self = this;
      this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
            self.chat.message = message.body;

              self.chat.messageTo = self.userId;
              self.chat.messageFrom = '7';
              self.chat.sentBy = self.sent;


          console.log('isdiisdsdidsiidsi');
          console.log(self.chat.message);
          console.log(self.chat.messageTo);
          console.log(self.chat.messageFrom);
            self.chatService.addChat(self.chat).subscribe((response) => {
              console.log(response);
              self.getChats();
            });
          // self.chatService.getAllChats().subscribe((response) => {
          //   console.log(response);
          // });

        }
      });

    });


  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    // this.chatService.getAllChats().subscribe((response) => {
    //   console.log(response);
    // });
   /* this.chat.message = message.body;
    this.chat.messageTo = this.userId;
    this.mes = message;
    this.chat.messageFrom = '128';
    this.chatService.addChat(this.chat);*/
    $('#input').val('');
  }

  getChats() {
    this.chatService.getAllChats().subscribe((response) => {
      this.chats = response;
    });
  }
}
