import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ServiceProviders} from './service-providers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {RequestOptions, Http, Response, Headers} from '@angular/http';
import {throwError} from 'rxjs';
import {ProviderLocatoin} from '../location/provider-locatoin';
import {environment} from '../../environments/environment';

@Injectable()
export class ServiceProvidersService {

  private readonly baseURL;

  constructor(private httpService: Http) {
    this.baseURL = environment.baseURL;
  }

  getServiceProvidersByPage(page: number) {
    const headers = new Headers({'Content-Type': 'application/json', });
    const options = new RequestOptions({headers});
    return this.httpService.get(this.baseURL + '/service-providers/find-all/page/?page=' + page)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  uploadImage(file: any, id: number) {
    const formData = new FormData();
    formData.append('imageFile', file);

    return this.httpService.post(this.baseURL + '/service-providers/' + id, formData)
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      });
  }

  getAllServiceProviders(): Observable<ServiceProviders[]> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    return this.httpService.get(this.baseURL + '/service-providers/find-all', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  addServiceProviders(service: ProviderLocatoin): Observable<ServiceProviders> {
    const body = JSON.stringify(service);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});

    return this.httpService.post(this.baseURL + '/service-providers/save', body, options)
      .map((response: Response) => response.json());

  }

  updateServiceProvider(id: number, service: ProviderLocatoin): Observable<ServiceProviders> {
    const body = JSON.stringify(service);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});

    return this.httpService.put(this.baseURL + '/service-providers/update/' + id, body, options)
      .map((response: Response) => response.json());
  }

  getServiceProviderById(id: number): Observable<ServiceProviders> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    return this.httpService.get(this.baseURL + '/service-providers/find-by-id/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  deleteServiceProvider(id: number) {
    return this.httpService.delete(this.baseURL + '/service-providers/delete/' + id);
  }

  private handleError(error: Response) {
    return throwError(error);
  }
}
