import {Component, HostListener, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {environment} from "../../environments/environment";
import {Chat} from "../chat/chat";
import {SecurityRolesService} from "../security-roles.service";

@Component({
  selector: 'app-chat-notify',
  templateUrl: './chat-notify.component.html',
  styleUrls: ['./chat-notify.component.css']
})
export class ChatNotifyComponent implements OnInit {
  isOpened = false;
  id:any;
  unreadChatsForUser: Chat[];
  constructor(private httpService: Http,private src: SecurityRolesService) { }
  getUnreadMessagesForAUser(sendTo:any){
    this.httpService.get(environment.baseURL+"/message/getUnreadForUser/" +sendTo ).map((response: Response) => response.json())
      .subscribe((response) => {
        console.log(response);
        this.unreadChatsForUser = response;
      });

  }
  ngOnInit() {
   this.id = this.src.getUserId();

  }
  @HostListener('click')
  clickOutside() {// if clicked outside the div then close the notification block
    this.isOpened = !this.isOpened;
  }

  reverse(){
    this.isOpened = false;
  }
  /*openNotifications() {
    this.isOpened = true;
  }*/
  openNotifications(divNotifications: HTMLDivElement) {
    this.isOpened = true;
    this.getUnreadMessagesForAUser(this.id);
  }
}
