import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ApiService} from '../core/api.service';
import {OfferDTO} from './models/offerDTO';
import {ServiceDTO} from './models/serviceDTO';
import {CustomerDTO} from './models/customerDTO';

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;'
  });

@Injectable()
export class CreateOfferService {

  constructor(private httpService: HttpClient, private apiService: ApiService) {
  }

  createOffer(offerDTO: OfferDTO): Observable<OfferDTO> {
    return this.httpService.post<OfferDTO>(environment.baseURL + '/offers' + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(offerDTO), {headers})
      .catch(this.handleError);
  }

  getCustomerByUserId(id: number): Observable<CustomerDTO> {
    return this.httpService.get<CustomerDTO>(environment.baseURL + '/customers/find-by-userId/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return throwError(error);
  }

  getAllServices(): Observable<ServiceDTO[]> {
    return this.httpService.get<ServiceDTO[]>(environment.baseURL + '/services', {headers})
      .catch(this.handleError);
  }
}
