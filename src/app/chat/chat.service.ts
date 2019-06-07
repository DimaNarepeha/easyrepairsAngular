import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Headers, Http, RequestOptions, Response} from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {Chat} from "./chat";
import {Messages} from "./Messages";


@Injectable()
export class ChatService {
  private customerId= "7";
  private providerId= "1";
  constructor(private httpService: Http) { }

  getAllChats(): Observable <Chat[]> {
    return this.httpService.get("http://localhost:8080/message/" +this.customerId + "/" + this.providerId).
    map( (response: Response) => response.json()).catch(this.handleError);
  }
  addChat(chat: Chat) {
    const body = JSON.stringify(chat);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.post("http://localhost:8080/message", body, options);
    }
  /*getAllMessages(): Observable <Messages> {
    return this.httpService.get("http://localhost:8080/message/getMessages/"+ this.customerId + "/" + this.providerId).
    map( (response: Response) => response.json()).catch(this.handleError);
  }*/
  private  handleError(error: Response) {
    return Observable.throw(error);
  }

}


