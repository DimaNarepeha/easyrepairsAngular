import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Notification} from './notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly baseURL; // TODO change hardcoded localhost


  constructor(private http: HttpClient) {// TODO change to https here
    this.baseURL = environment.baseURL;
  }

  getNotificationsForUser(id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseURL + '/notification/get/' + id);
  }

  addNotificationForUser(id, notification: Notification) {
    this.http.post(this.baseURL + 'notification/post/' + id, notification);
  }
}
