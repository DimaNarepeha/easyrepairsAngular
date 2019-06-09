import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {environment} from 'src/environments/environment';
import {OrderDTO} from '../create-offer/models/orderDTO';
import {ServiceDTO} from '../create-offer/models/serviceDTO';
import {CustomerDTO} from '../create-offer/models/customerDTO';
import {ProviderDTO} from '../create-offer/models/providerDTO';

@Injectable()
export class CreateOrderService {

  constructor(private httpService: Http) {
  }

  createOrder(orderDTO: OrderDTO): Observable<OrderDTO> {
    const body = JSON.stringify(orderDTO);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.post(environment.baseURL + '/orders/', body, options)
      .map((response: Response) => response.json());
  }

  getCustomerByUserId(id: number): Observable<CustomerDTO> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/customers/find-by-userId/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getProviderById(id: number): Observable<ProviderDTO> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/service-providers/find-by-id/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getAllServices(): Observable<ServiceDTO[]> {
    return this.httpService.get(environment.baseURL + '/services/')
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}
