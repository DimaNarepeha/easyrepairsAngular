import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiService} from '../core/api.service';
import {OfferDTO} from '../create-offer/models/offerDTO';
import {CustomerDTO} from '../create-offer/models/customerDTO';

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;'
  });

@Injectable()
export class ListOfferService {
  constructor(private httpService: HttpClient, private apiService: ApiService) {
  }

  getAllOffers(): Observable<OfferDTO[]> {
    return this.httpService.get<OfferDTO[]>(environment.baseURL + '/offers?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  getCustomerByUserId(id: number): Observable<CustomerDTO> {
    return this.httpService.get<CustomerDTO>(environment.baseURL + '/customers/find-by-userId/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  deleteOfferById(id: number) {
    return this.httpService.delete(environment.baseURL + '/offers/' + id + '?access_token='
      + this.apiService.returnAccessToken());
  }

  private handleError(error: Response) {
    return throwError(error);
  }
}
