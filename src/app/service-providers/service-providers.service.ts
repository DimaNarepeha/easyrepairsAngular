import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
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
import {ApiService} from '../core/api.service';
import {NotifierService} from 'angular-notifier';
import {Email} from "../admin-approve-page/Email";


const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json'
  });

@Injectable()
export class ServiceProvidersService {


  private readonly baseURL;
  private readonly notifier: NotifierService;

  constructor(private httpService: HttpClient, private apiService: ApiService, notifierService: NotifierService) {
    this.baseURL = environment.baseURL;
    this.notifier = notifierService;
  }

  getServiceProvidersByPage(page: number): Observable<any> {
    return this.httpService.get<any>(this.baseURL + '/service-providers/find-all/page/?page=' + page + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }


  uploadImage(file: any, id: number) {
    const formData = new FormData();
    formData.append('imageFile', file);

    return this.httpService.post(this.baseURL + '/service-providers/' + id, formData)
      .subscribe(res => {
        console.log(res);
        this.notifier.notify('success', 'photo updated');
        location.reload();
      });
  }

  getAllServiceProviders(): Observable<ServiceProviders[]> {
    return this.httpService.get<ServiceProviders[]>(this.baseURL + '/service-providers/find-all', {headers})
      .catch(this.handleError);

  }

  addServiceProviders(service: ServiceProviders): Observable<ServiceProviders> {
    return this.httpService.post<ServiceProviders>(this.baseURL + '/service-providers/save', JSON.stringify(service), {headers});

  }

  updateServiceProvider(service: ServiceProviders): Observable<ServiceProviders> {
    return this.httpService.put<ServiceProviders>(this.baseURL + '/service-providers/update' + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(service), {headers});
  }

  getServiceProviderById(id: number): Observable<ServiceProviders> {
    return this.httpService.get<ServiceProviders>(this.baseURL + '/service-providers/find-by-id/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);

  }

  getServiceProviderByUserId(id: any): Observable<ServiceProviders> {
    return this.httpService.get<ServiceProviders>(this.baseURL + '/service-providers/find-by-userId/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  deleteServiceProvider(id: number) {
    return this.httpService.delete(this.baseURL + '/service-providers/delete/' + id + '?access_token='
      + this.apiService.returnAccessToken());
  }

  updateServiceProviderStatus(id: number, providerDTO: ServiceProviders): Observable<ServiceProviders> {
    const status: string = ProviderStatus[providerDTO.status];
    const body = status;
    console.log('id ' + id + '  status  ' + providerDTO.status);
    return this.httpService.put<ServiceProviders>(this.baseURL + '/service-providers/update-status/' + id, body);
  }

  getServiceProvidersByStatus(page: number, numberOfProvidersOnPage: number, status: ProviderStatus): Observable<ServiceProviders[]> {
    const statusString: string = ProviderStatus[status];
    const params = new HttpParams().set('numberOfProvidersOnPage', String(numberOfProvidersOnPage))
      .set('page', String(page)).set('status', statusString);
    return this.httpService.get<ServiceProviders[]>(this.baseURL + `/service-providers/find-all/status?` + params);
  }

  getServiceProvidersByName(searchName: string, page: any, numberOfProvidersOnPage: any, status: string) {
    const statusString: string = ProviderStatus[status];
    const params = new HttpParams().set('numberOfProvidersOnPage', String(numberOfProvidersOnPage))
      .set('page', String(page)).set('status', statusString).set("searchName", searchName);
    return this.httpService.get<ServiceProviders[]>(this.baseURL + `/service-providers/find-all/searchByName?` + params);
  }

  sendEmailToUser( email: Email) : Observable<any> {
    let body = JSON.stringify(email);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.httpService.post('http://localhost:8080/email/', body);
  }

  private handleError(error: Response) {
    return throwError(error);
  }
}
