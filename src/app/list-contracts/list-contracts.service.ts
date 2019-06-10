import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {OrderDTO} from '../create-offer/models/orderDTO';
import {CustomerDTO} from '../create-offer/models/customerDTO';
import {ProviderDTO} from '../create-offer/models/providerDTO';

@Injectable()
export class ListOrderService {
  constructor(private httpService: Http) {
  }
  getAllOrders(): Observable<OrderDTO[]> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/orders/', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getProviderByUserId(id: number): Observable<ProviderDTO> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/service-providers/find-by-userId/' + id, options) // TODO
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getCustomerByUserId(id: number): Observable<CustomerDTO> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.get(environment.baseURL + '/customers/find-by-userId/' + id, options) // TODO
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateOrder(order: OrderDTO) {
    const body = JSON.stringify(order);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.put(environment.baseURL + '/orders/', body, options)
      .map((response: Response) => response.json());
  }

  deleteOrderById(id: number) {
    return this.httpService.delete(environment.baseURL + '/orders/' + id);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}
