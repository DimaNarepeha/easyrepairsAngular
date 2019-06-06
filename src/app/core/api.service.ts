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
    // @ts-ignore
    return this.http.get(this.baseURL + '/user?access_token=' + this.returnAccessToken())
      .catch(err => Observable.throw(err));
  }

  returnAccessToken() {
    if (window.sessionStorage.getItem('token') != null) {
      return JSON.parse(window.sessionStorage.getItem('token')).access_token;
    }
  }

}
