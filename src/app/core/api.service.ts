import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../login/user';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {

  private readonly baseURL;

  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
  }

  login(loginPayload) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('junior-client:junior-secret'),
      'Content-type': 'application/x-www-form-urlencoded',
    });
    return this.http.post(this.baseURL + '/oauth/token', loginPayload, {headers});
  }

  password_recovery(loginPayload) {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(this.baseURL + '/recovery', loginPayload, {headers});
  }

  get(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.returnAccessToken()
    });
    console.log(headers);
    return this.http.get<User>(this.baseURL + '/user', {headers})
      .catch(err => Observable.throw(err));
  }

  logoutme() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.returnAccessToken()
    });
    console.log(this.returnAccessToken());
    console.log(headers);
    return this.http.get(this.baseURL + '/logmeout', {headers})
      .catch(err => Observable.throw(err));
  }

  returnAccessToken() {
    if (window.sessionStorage.getItem('token') != null) {
      return JSON.parse(window.sessionStorage.getItem('token')).access_token;
    }
  }

}
