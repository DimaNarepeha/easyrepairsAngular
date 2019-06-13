import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {Chat} from "./chat";
import {environment} from "../../environments/environment";
import {SecurityRolesService} from "../security-roles.service";

@Injectable()
export class ChatService {
  private customerId = "1";
  private providerId = "20002";

  constructor(private httpService: Http, private src: SecurityRolesService) {
  }

  getAllChats(sendTo:any,sendFrom:any): Observable<Chat[]> {
    return this.httpService.get(environment.baseURL+"/message/" +sendTo /*this.customerId*/ + "/" + sendFrom/*this.providerId*/).map((response: Response) => response.json()).catch(this.handleError);
  }

  addChat(chat: Chat) {
    const body = JSON.stringify(chat);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.post(environment.baseURL + "/message", body, options);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

}


