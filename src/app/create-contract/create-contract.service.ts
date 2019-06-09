import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {OrderDTO} from '../create-offer/models/orderDTO';
import {ServiceDTO} from '../create-offer/models/serviceDTO';
import {CustomerDTO} from '../create-offer/models/customerDTO';
import {ProviderDTO} from '../create-offer/models/providerDTO';
import {ApiService} from '../core/api.service';

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;'
  });

@Injectable()
export class CreateOrderService {

  constructor(private httpService: HttpClient, private apiService: ApiService) {
  }

  createOrder(orderDTO: OrderDTO): Observable<OrderDTO> {
    return this.httpService.post<OrderDTO>(environment.baseURL + '/orders/' + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(orderDTO), {headers})
      .catch(this.handleError);
  }

  getCustomerByUserId(id: number): Observable<CustomerDTO> {
    return this.httpService.get<CustomerDTO>(environment.baseURL + '/customers/find-by-userId/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  getProviderById(id: number): Observable<ProviderDTO> {
    return this.httpService.get<ProviderDTO>(environment.baseURL + '/service-providers/find-by-id/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  getAllServices(): Observable<ServiceDTO[]> {
    return this.httpService.get<ServiceDTO[]>(environment.baseURL + '/services/', {headers})
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return throwError(error);
  }
}
