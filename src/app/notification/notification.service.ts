import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications = [{id: 1, header: 'User added', message: 'New user added', time: '17:21 12/05/2019'},
    {id: 1, header: 'User added', message: 'New user added', time: '17:21 12/05/2019'},
    {id: 2, header: 'ALALA added', message: 'New user added', time: '17:23 12/05/2019'},
    {id: 3, header: 'BLA added', message: 'New user added', time: '17:25 12/05/2019'},
    {id: 4, header: 'User added', message: 'New user added', time: '17:26 12/05/2019'},
    {id: 5, header: 'User added', message: 'New user )))))', time: '17:27 12/05/2019'},];

  constructor() {
  }

  getNotificationsForUser(id: number) {
    return this.notifications;
  }
}
