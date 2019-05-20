import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly baseURL; // TODO change hardcoded localhost


  constructor(private http: HttpClient) {// TODO change to https here
    this.baseURL = environment.baseURL + '/notification/get/';
  }

  getNotificationsForUser(id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseURL + id);
  }
}
