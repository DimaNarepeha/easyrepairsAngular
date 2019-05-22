import {Injectable} from '@angular/core';
import {Customer} from "./customer";
import {Observable} from "rxjs";
import {RequestOptions, Http, Response, Headers} from '@angular/http';
import {HttpClient} from "@angular/common/http";
import {Provider} from "./provider";
import {_catch} from "rxjs-compat/operator/catch";


@Injectable()
export class RegistrationService {

  constructor(private httpService: Http , private http: HttpClient) {
  }

  createCustomer(customer: Customer): Observable<Customer> {
    let body = JSON.stringify(customer);
    let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    let options = new RequestOptions({headers: headers});

    return this.httpService.post('http://localhost:8080/register/customer', body, options)
      .map((response: Response) => response.json());
  }
  createProvider(provider: Provider): Observable<Provider> {
    {
      let body = JSON.stringify(provider);
      let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
      let options = new RequestOptions({headers: headers});

      return this.httpService.post('http://localhost:8080/register/provider', body, options)
        .map((response: Response) => response.json());

    }
  }
}









