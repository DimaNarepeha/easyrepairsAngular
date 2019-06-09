import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {OfferDTO} from '../create-offer/models/offerDTO';
import {environment} from '../../environments/environment';
import {CustomerDTO} from '../create-offer/models/customerDTO';

@Injectable()
export class ListOfferService {
  constructor(private httpService: Http) {
  }

  getAllOffers(): Observable<OfferDTO[]> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/offers/', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getCustomerByUserId(id: number): Observable<CustomerDTO> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/customers/find-by-userId/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteOfferById(id: number) {
    return this.httpService.delete(environment.baseURL + '/offers/' + id);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}
