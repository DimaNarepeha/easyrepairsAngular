import {Component, HostListener, OnInit} from '@angular/core';
import {NotificationService} from './notification.service';
import {Notification} from './notification';
import {SecurityRolesService} from '../security-roles.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent extends SecurityRolesService implements OnInit {
  isOpen: boolean;
  notifications: Notification[];
  wasInside: boolean;
  securityRolesService: SecurityRolesService;
  isNewNotifications = false;

  constructor(private notificationService: NotificationService) {
    super();
    this.securityRolesService = new SecurityRolesService();
    this.loadNotifications();
  }

  ngOnInit() {
  }

  loadNotifications() {
    if (this.securityRolesService.isLoggedIn()) {
      this.notificationService.getNotificationsForUser(this.securityRolesService.getUserId())
        .subscribe(data => {
          this.notifications = data;
          this.checkForNewNotifications();
          this.notifications = this.notifications.reverse();
        });
    }
  }

  openNotifications(divNotifications: HTMLDivElement) {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
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
    this.isNewNotifications = false;
  }

  checkForNewNotifications() {
    this.notifications.forEach((notification) => {
      if (!notification.seen) {
        this.isNewNotifications = true;
        return;
      }
    });
  }

}
