import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = 'http://localhost:8080/notification/get/'; // TODO change hardcoded localhost


  constructor(private http: HttpClient) {// TODO change to https here
  }

  getNotificationsForUser(id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.url + id);
  }
}
