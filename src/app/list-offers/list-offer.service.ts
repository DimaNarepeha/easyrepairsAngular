import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {OfferDTO} from '../create-offer/models/offerDTO';
import {environment} from "../../environments/environment";

@Injectable()
export class ListOfferService {
  constructor(private httpService: Http) {
  }

  getAllOffers(): Observable<OfferDTO[]> {
    let headers = new Headers({'Access-Control-Allow-Origin': 'http://localhost:8080'});
    let options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/offers/get-all', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getOfferById(id: number): Observable<OfferDTO> {
    let headers = new Headers({'Access-Control-Allow-Origin': 'http://localhost:8080'});
    let options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/offers/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}
