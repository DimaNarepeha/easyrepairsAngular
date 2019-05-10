import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isOpen: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  openNotifications() {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }
}
