import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Notification} from './notification';
import {ApiService} from '../core/api.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly baseURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.baseURL = environment.baseURL;
  }

  getNotificationsForUser(id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseURL + '/notification/get/' + id + '?access_token='
      + this.apiService.returnAccessToken());
  }


  addNotificationForUser(id, notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.baseURL + '/notification/add/' + id + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(notification), this.httpOptions);
  }

  setNotificationAsSeenOnDb(notification) {
    return this.http.put<Notification>(this.baseURL + '/notification/' + notification.id + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(notification), this.httpOptions);

  }
}
