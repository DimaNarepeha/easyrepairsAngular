import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
import {HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ProvidersInfo } from './providers-info';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';



@Injectable()
export class ProvidersInfoService{

    constructor(private _httpService: Http,private _sanitizer: DomSanitizer){};

    getAllProvidersInfo(): Observable <ProvidersInfo>{
           return this._httpService.get("http://localhost:8080/landing-page").
            map( (response:Response) => response.json()).catch(this.handleError);
    }
private handleError(error: Response){
            return Observable.throw(error);
    }
}
