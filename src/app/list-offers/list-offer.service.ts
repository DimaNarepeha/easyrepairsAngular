import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {OfferDTO} from '../create-offer/models/offerDTO';
import {environment} from '../../environments/environment';

@Injectable()
export class ListOfferService {
  constructor(private httpService: Http) {
  }

  getAllOffers(): Observable<OfferDTO[]> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/offers/get-all', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}
