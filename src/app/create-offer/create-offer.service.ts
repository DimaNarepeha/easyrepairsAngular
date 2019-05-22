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
    let body = JSON.stringify(offerDTO);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.httpService.post(environment.baseURL + '/offers/create', body, options)
      .map((response: Response) => response.json());
  }

  getAllOffers(): Observable<OfferDTO[]> {
    let headers = new Headers({'Access-Control-Allow-Origin': environment.baseURL});
    let options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/offers/get-all', options)
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
    let headers = new Headers({'Access-Control-Allow-Origin': environment.baseURL});
    let options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/services/get-all', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
}
