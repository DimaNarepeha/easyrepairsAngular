import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Notification} from '../notification/notification';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private readonly baseURL;

  constructor(private http: HttpClient) {// TODO change to https here
    this.baseURL = environment.baseURL;
  }

  verifyUser(activationCode) {
    return this.http.get<Response>(this.baseURL + '/register/verify/' + activationCode);
  }

}
