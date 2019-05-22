import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {OfferDTO} from './models/offerDTO';
import {ServiceDTO} from './models/serviceDTO';
import {HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { environment } from 'src/environments/environment';

@Injectable()
export class CreateOfferService {

  constructor(private httpService: Http) {
  }

  createOffer(offerDTO: OfferDTO): Observable<OfferDTO> {
    const body = JSON.stringify(offerDTO);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.post(environment.baseURL + '/offers/create', body, options)
      .map((response: Response) => response.json());
  }

  getAllOffers(): Observable<OfferDTO[]> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/offers/get-all', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getOffersByCustomerId(id: number): Observable<OfferDTO[]> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/offers/get-all-by-customer/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteOfferById(id: number) {
    return this.httpService.delete(environment.baseURL + '/offers/delete/' + id);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

  getAllServices(): Observable<ServiceDTO[]> {
    return this.httpService.get(environment.baseURL + '/services/get-all')
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
}
