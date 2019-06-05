import {Component, HostListener, OnInit} from '@angular/core';
import {NotificationService} from './notification.service';
import {Notification} from './notification';
import {SecurityRolesService} from '../security-roles.service';
import {__values} from 'tslib';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent extends SecurityRolesService implements OnInit {
  isOpen: boolean;
  notifications: Notification[];
  private wasInside: boolean;
  securityRolesService: SecurityRolesService;

  constructor(private notificationService: NotificationService) {
    super();
    this.securityRolesService = new SecurityRolesService();
  }

  ngOnInit() {
    if (this.securityRolesService.isLoggedIn()) {
      this.notificationService.getNotificationsForUser(this.securityRolesService.getUserId())
        .subscribe(data => this.notifications = data);
    }
  }

  openNotifications(divNotifications: HTMLDivElement) {
    this.isOpen = !this.isOpen;
    if(!this.isOpen){
      this.markAllNotificationsAsSeen();
    }
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

  markAllNotificationsAsSeen() {
    this.notifications.forEach((notification) => {
      if (!notification.seen) {
        notification.seen = true;
        this.notificationService.setNotificationAsSeenOnDb(notification).subscribe();
      }
    });
  }

  sendNotifications() {
    const x: Notification = {
      id: 0,
      header: 'HI!',
      message: 'Here we go!',
      time: new Date(),
      seen: false
    };
    console.log('Send notifications');
    this.notificationService.addNotificationForUser(1, x).subscribe();
  }

}
