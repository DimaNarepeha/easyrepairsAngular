import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Notification} from '../notification/notification';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificationServiceService {
  private readonly baseURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {// TODO change to https here
    this.baseURL = environment.baseURL;
  }


  verifyUser(activationCode) {
    return this.http.get<string>(this.baseURL + '/register/verify/' + activationCode);
  }

}
