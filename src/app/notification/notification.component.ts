import {Component, HostListener, OnInit} from '@angular/core';
import {NotificationService} from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isOpen: boolean;
  notifications: { header: string; id: number; time: string; message: string }[];
  private wasInside: boolean;

  constructor(private notificationService: NotificationService) {
    this.notifications = notificationService.getNotificationsForUser(1);
  }

  ngOnInit() {
  }

  openNotifications(divNotifications: HTMLDivElement) {
    this.isOpen = !this.isOpen;
    divNotifications.focus();
    divNotifications.scrollTop = 0;
  }


  @HostListener('click')
  clickInside() {// if clicked inside the div
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickOutside() {// if clicked outside the div then close the notification block
    if (!this.wasInside) {
      this.isOpen = false;
    }
    this.wasInside = false;
  }
}
