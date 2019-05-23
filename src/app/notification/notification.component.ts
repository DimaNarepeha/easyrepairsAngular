import {Component, HostListener, OnInit} from '@angular/core';
import {NotificationService} from './notification.service';
import {Notification} from './notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isOpen: boolean;
  notifications;
  private wasInside: boolean;

  constructor(private notificationService: NotificationService) {
    this.notificationService.getNotificationsForUser(1)// TODO change hardcoded user here
      .subscribe(data => this.notifications = data);
  }

  ngOnInit() {
  }

  openNotifications(divNotifications: HTMLDivElement) {
    this.isOpen = !this.isOpen;
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
