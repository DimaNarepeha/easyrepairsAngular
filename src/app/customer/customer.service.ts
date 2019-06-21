import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Customer} from './customer';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {environment} from 'src/environments/environment';
import {ApiService} from '../core/api.service';
import {CustomerStatus} from "./CustomerStatus";

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json'
  });

@Injectable()
export class CustomerService {
  constructor(private httpService: Http, private http: HttpClient,private service: ApiService) {}

  uploadImage(file: any, id: number) {
    const formData = new FormData();
    formData.append('imageFile', file);
    return this.httpService.post(environment.customer_url + id + '/image', formData);
  }

  getImage(image: string): Observable<any> {
    return this.httpService.get(environment.customer_url + 'image/' + image);
  }

  getCustomersPage(page: number) {
    return this.httpService.get(environment.customer_url + 'list?page=' + page + '&access_token=' + this.service.returnAccessToken());
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.httpService.get(environment.customer_url + '?access_token=' + this.service.returnAccessToken())
      .map((response: Response) => response.json()).catch(this.handleError);
  }

  addCustomer(customer: Customer) {
    const body = JSON.stringify(customer);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.httpService.put(environment.customer_url + '?access_token=' + this.service.returnAccessToken(), body, options);
  }

  deleteCustomer(customerId: string) {
    return this.httpService.delete(environment.customer_url + customerId + '?access_token=' + this.service.returnAccessToken());
  }

  getCustomerById(customerId: string): Observable<Customer> {
    return this.httpService.get(environment.customer_url + customerId + '?access_token=' + this.service.returnAccessToken())
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getCustomerByUserId(id: any): any {
    console.log(environment.customer_url + 'find-by-userId/' + id);
    return this.http.get(environment.customer_url + 'find-by-userId/' + id + '?access_token=' + this.service.returnAccessToken(), {headers})
      .catch(this.handleError);

  }

  getCustomersByStatus(page: any, numberOfCustomersOnPage: any, status: CustomerStatus): Observable<Customer[]> {
    const statusString: string = CustomerStatus[status];
    const params = new HttpParams().set('pageSize', String(numberOfCustomersOnPage))
      .set('pageNumber', String(page)).set('status', statusString);
    return this.http.get<Customer[]>( environment.customer_url + 'status?' + params + '&access_token=' + this.service.returnAccessToken(),{headers})
    .catch(this.handleError);
  }

  updateStatus(id: number, status: CustomerStatus): Observable<any> {
    const body  = CustomerStatus[status];
    return this.http.put<any>(environment.customer_url + 'update-status/' +  id +  '?access_token=' + this.service.returnAccessToken(), body,{headers});
  }

  getCustomersByFirstName(page: any, numberOfCustomersOnPage: any, status: CustomerStatus, firstName: string): Observable<Customer[]> {
    const statusString: string = CustomerStatus[status];
    const params = new HttpParams().set('firstName', firstName).set('pageSize', String(numberOfCustomersOnPage))
      .set('pageNumber', String(page)).set('status', statusString);
    return this.http.get<Customer[]>( environment.customer_url + 'status/searchByFirstName?' + params + '&access_token=' + this.service.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}
