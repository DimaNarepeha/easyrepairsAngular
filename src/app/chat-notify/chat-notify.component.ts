import {Component, HostListener, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {environment} from "../../environments/environment";
import {Chat} from "../chat/chat";
import {SecurityRolesService} from "../security-roles.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-chat-notify',
  templateUrl: './chat-notify.component.html',
  styleUrls: ['./chat-notify.component.css']
})
export class ChatNotifyComponent implements OnInit {
  private readonly notifier: NotifierService;
  isOpened = false;
  empty: boolean;
  id: any;
  unreadChatsForUser: Chat[];
  url = environment.baseURL + "/service-providers/image/";

  constructor(private httpService: Http, private src: SecurityRolesService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  getUnreadMessagesForAUser(sendTo: any) {
    this.httpService.get(environment.baseURL + "/message/getUnreadForUser/" + sendTo).map((response: Response) => response.json())
      .subscribe((response) => {
        console.log(response);
        this.unreadChatsForUser = response;
      });
    if (this.unreadChatsForUser && this.unreadChatsForUser.length === 0) {
      this.notifier.notify('success', 'No messages for you!');
    }
  }

  ngOnInit() {
  }

  @HostListener('click')
  clickOutside() {// if clicked outside the div then close the notification block
    this.isOpened = !this.isOpened;
  }

  reverse() {
    this.isOpened = false;
  }

  openNotifications(divNotifications: HTMLDivElement) {
    this.id = this.src.getUserId();
    this.isOpened = true;
    this.getUnreadMessagesForAUser(this.id);


  }
}
