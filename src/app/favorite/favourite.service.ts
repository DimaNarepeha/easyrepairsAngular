import {Injectable, Optional} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ServiceProviders} from "../service-providers/service-providers";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json'
  });


@Injectable()
export class FavouriteService {

  constructor(private http: HttpClient) {}

  getFavouriteServiceProviders(customerId: number):Observable<ServiceProviders> {
    console.log(environment.favourite_url + 'findAll/?customerId=' + customerId);
    return this.http.get<ServiceProviders>( environment.favourite_url + 'findAll/?customerId=' + customerId);
  }

  addToFavourite(customerId: number, serviceProvider: ServiceProviders): any {
    const body  = JSON.stringify(serviceProvider.id);
    return this.http.put(environment.favourite_url + "addToFavourite/" + customerId +'/provider/' + serviceProvider.id, {});
  }
}
