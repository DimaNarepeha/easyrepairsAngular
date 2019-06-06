import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ProvidersInfo} from '../core/model/providers-info';
import {Feedback} from '../core/model/feedback';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {RequestOptions, Http, Response, Headers} from '@angular/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpGeneralService {

  private url = 'http://localhost:8080/landing-page/';
  private allapproved = 'all-approved';
  private comments = 'top-comment';

  // TODO change hardcoded localhost


  constructor(private http: HttpClient) {// TODO change to https here
  }

  getApprovedProviders(): Observable<ProvidersInfo[]> {
    return this.http.get<ProvidersInfo[]>(this.url + this.allapproved );
  }

  getLatestComments(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.url + this.comments);
  }
}
