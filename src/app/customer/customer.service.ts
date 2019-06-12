import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {Customer} from './customer';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {environment} from 'src/environments/environment';
import {ApiService} from '../core/api.service';



@Injectable()
export class CustomerService {
  constructor(private httpService: Http, private apiService: ApiService) {
  }

  uploadImage(file: any, id: number) {
    const formData = new FormData();
    formData.append('imageFile', file);
    return this.httpService.post(environment.customer_url + id + '/image?access_token=' + this.apiService.returnAccessToken(), formData);
  }

  getImage(image: string): Observable<any> {
    return this.httpService.get(environment.customer_url + 'image/' + image + '?access_token=' + this.apiService.returnAccessToken());
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

  getCustomerByUserId(id: any): Observable<Customer> {
    return this.httpService.get(environment.customer_url + 'find-by-userId/' + id)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}
