import {Injectable, Optional} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ServiceProviders} from "../service-providers/service-providers";
import {environment} from "../../environments/environment";
import {CustomerService} from "../customer/customer.service";
import {Observable} from "rxjs";
import {CustomerStatus} from "../customer/CustomerStatus";
import {Headers, Http, RequestOptions} from "@angular/http";
const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json'
  });


@Injectable()
export class FavouriteService {
  constructor( private http: HttpClient,customerService :CustomerService,private httpService: Http) {
  }

  getFavouriteServiceProviders(customerId: number):any {
    console.log(environment.favourite_url + 'findAll/?customerId=' + customerId);
    return this.http.get<any>( environment.favourite_url + 'findAll/?customerId=' + customerId);
  }

  checkFavourite(serviceProvider: ServiceProviders,customerId :number): boolean {
    // serviceProviders = this.http.get<ServiceProviders[]>(environment.favourite_url + 'findAll/?customerId=' + customerId, {headers});
    // for (let provider in serviceProviders) {
    //   if (provider == serviceProvider) {
        return true;
    //   }
    // }
  }

  addToFavourite(customerId: number, serviceProvider: ServiceProviders): any {
    const body  = JSON.stringify(serviceProvider.id);
    console.log(body);
    return this.http.put(environment.favourite_url + "addToFavourite/" + customerId +'/provider/' + serviceProvider.id, {});
  }
}
