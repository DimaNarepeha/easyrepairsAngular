import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {RequestOptions, Http, Response, Headers} from '@angular/http';
import {Email} from './Email';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminApprovePageService {

  constructor(private httpService: Http) {

  }
  sendEmailToUser( email: Email) : Observable<any> {
    let body = JSON.stringify(email);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.httpService.post('http://localhost:8080/email/',  body,options);
  }

}
