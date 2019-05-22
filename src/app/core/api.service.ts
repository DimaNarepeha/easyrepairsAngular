import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../login/user';

@Injectable()
export class ApiService {


  constructor(private http: HttpClient) {
  }

  login(loginPayload) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('junior-client:junior-secret'),
      'Content-type': 'application/x-www-form-urlencoded',
    });
    return this.http.post('http://localhost:8080/' + 'oauth/token', loginPayload, {headers});
  }

  get(): Observable<User> {
    // @ts-ignore
    return this.http.get('http://localhost:8080/user?access_token=' + this.returnAccessToken())
      .catch(err => Observable.throw(err));
  }

  returnAccessToken() {
    if (window.sessionStorage.getItem('token') != null) {
      return JSON.parse(window.sessionStorage.getItem('token')).access_token;
    }
  }

}
