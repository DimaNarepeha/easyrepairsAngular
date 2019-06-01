import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Headers, Http, RequestOptions, Response} from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {Chat} from "./chat";


@Injectable()
export class ChatService {
  constructor(private httpService: Http) { }

  getAllChats(): Observable <Chat[]> {
    return this.httpService.get("https://localhost:8080/message").
    map( (response: Response) => response.json()).catch(this.handleError);
  }
  addChat(chat: Chat) {
    const body = JSON.stringify(chat);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.post("http://localhost:8080/message", body, options);
    }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}


