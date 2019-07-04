import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiService} from '../core/api.service';
import {OrderDTO} from '../create-offer/models/orderDTO';
import {CustomerDTO} from '../create-offer/models/customerDTO';
import {ProviderDTO} from '../create-offer/models/providerDTO';
import {UserDTO} from '../create-offer/models/userDTO';

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;'
  });

@Injectable()
export class ListOrderService {
  constructor(private httpService: HttpClient, private apiService: ApiService) {
  }
  getAllOrders(): Observable<OrderDTO[]> {
    return this.httpService.get<OrderDTO[]>(environment.baseURL + '/orders?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  getProviderByUserId(id: number): Observable<ProviderDTO> {
    return this.httpService.get<ProviderDTO>(environment.baseURL + '/service-providers/find-by-userId/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  getCustomerByUserId(id: number): Observable<CustomerDTO> {
    return this.httpService.get<CustomerDTO>(environment.baseURL + '/customers/find-by-userId/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  updateOrder(order: OrderDTO): Observable<OrderDTO> {
    return this.httpService.put<OrderDTO>(environment.baseURL + '/orders' + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(order), {headers});
  }

  deleteOrderById(id: number) {
    return this.httpService.delete(environment.baseURL + '/orders/' + id + '?access_token='
      + this.apiService.returnAccessToken());
  }

  downloadContract(fileName: string) {
    return this.httpService.get(environment.baseURL + '/orders/contract/' + fileName + '?access_token='
      + this.apiService.returnAccessToken(), {headers, responseType: 'blob', observe: 'response'});
  }

  receiveContractByEmail(id: number, userDTO: UserDTO) {
    return this.httpService.put(environment.baseURL + '/orders/email/contract/' + id + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(userDTO), {headers});
  }

  private handleError(error: Response) {
    return throwError(error);
  }
}
