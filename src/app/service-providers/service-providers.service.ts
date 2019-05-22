import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ServiceProviders} from './service-providers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {RequestOptions, Http, Response, Headers} from '@angular/http';
import {throwError} from 'rxjs';
import {ProviderLocatoin} from '../location/provider-locatoin';
import {environment} from '../../environments/environment';
import {ProviderStatus} from './service-provider.status';
import {map} from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})};

@Injectable()
export class ServiceProvidersService {

  private readonly baseURL;

  constructor(private httpService: Http, private http: HttpClient) {
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
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});

    return this.httpService.post(this.baseURL + '/service-providers/' + id, formData, options)
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

  updateServiceProviderStatus(id: number ,providerDTO: ServiceProviders) {
    let status: string = ProviderStatus[providerDTO.status];
    let body = status;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    console.log('id ' + id + '  status  ' + providerDTO.status);
    return this.httpService.put('http://localhost:8080/service-providers/update-status/' + id, body)
      .map((response: Response) => response.json());
  }

  getServiceProvidersByStatus(page: number, numberOfProvidersOnPage: number, status: ProviderStatus): Observable<ServiceProviders[]> {
    let statusString: string = ProviderStatus[status];
    let params = new HttpParams().set('numberOfProvidersOnPage', String(numberOfProvidersOnPage))
      .set('page', String(page)).set('status', statusString);
    console.log(this.httpService.get(`http://localhost:8080/service-providers/find-all/status?` + params));
    return this.http.get<ServiceProviders[]>(`http://localhost:8080/service-providers/find-all/status?` + params)
      .pipe(
        map(res => res['content']));
  }


  private handleError(error: Response) {
    return throwError(error);
  }
}
