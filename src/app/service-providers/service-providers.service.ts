import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ServiceProviders} from './service-providers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Response} from '@angular/http';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {ProviderStatus} from './service-provider.status';
import {ApiService} from '../core/api.service';
import {NotifierService} from 'angular-notifier';
import {Email} from "../admin-approve-page/Email";
import {Portfolio} from "../portfolio/portfolio";


const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;charset=UTF-8'
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
    return this.httpService.get<any>(this.baseURL + '/service-providers/find-all/page/?page=' + page)
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
    return this.httpService.get<ServiceProviders[]>(this.baseURL + '/service-providers/find-all')
      .catch(this.handleError);
  }

  addServiceProviders(service: ServiceProviders): Observable<ServiceProviders> {
    return this.httpService.post<ServiceProviders>(this.baseURL + '/service-providers/save', JSON.stringify(service));

  }

  updateServiceProvider(service: ServiceProviders): Observable<ServiceProviders> {
    return this.httpService.put<ServiceProviders>(this.baseURL + '/service-providers/update', JSON.stringify(service));
  }

  getServiceProviderById(id: number): Observable<ServiceProviders> {
    return this.httpService.get<ServiceProviders>(this.baseURL + '/service-providers/find-by-id/' + id )
      .catch(this.handleError);

  }

  getServiceProviderByUserId(id: any): Observable<ServiceProviders> {
    return this.httpService.get<ServiceProviders>(this.baseURL + '/service-providers/find-by-userId/' + id )
      .catch(this.handleError);
  }

  deleteServiceProvider(id: number) {
    return this.httpService.delete(this.baseURL + '/service-providers/delete/' + id );
  }

  updateServiceProviderStatus(id: number, serviceProvider: ServiceProviders): Observable<ServiceProviders> {
    const body = ProviderStatus[serviceProvider.status];
    console.log('id ' + id + '  status  ' + serviceProvider.status);
    return this.httpService.put<ServiceProviders>(this.baseURL + '/service-providers/update-status/' + id, body);
  }

  getServiceProvidersByStatus(page: number, numberOfProvidersOnPage: number, status: ProviderStatus): Observable<ServiceProviders[]> {
    const statusString: string = ProviderStatus[status];
    const params = new HttpParams().set('numberOfProvidersOnPage', String(numberOfProvidersOnPage))
      .set('page', String(page)).set('status', statusString);
    return this.httpService.get<ServiceProviders[]>(this.baseURL + `/service-providers/find-all/status?` + params);
  }

  getServiceProvidersByName(searchName: string, page: number, numberOfProvidersOnPage: number, status: ProviderStatus): Observable<ServiceProviders[]>{
    const statusString: string = ProviderStatus[status];
    const params = new HttpParams().set('numberOfProvidersOnPage', String(numberOfProvidersOnPage))
      .set('page', String(page)).set('status', statusString).set("searchName", searchName);
    return this.httpService.get<ServiceProviders[]>(this.baseURL + `/service-providers/find-all/searchByName?` + params);
    // + '&access_token=' + this.apiService.returnAccessToken(), {headers}
  }

  sendEmailToUser( email: Email) : Observable<any> {
    let body = JSON.stringify(email);
    return this.httpService.post('http://localhost:8080/email/', body , {headers} );
  }

  getPortfolio(id: number): Observable<Portfolio> {
    return this.httpService.get<Portfolio>(this.baseURL + '/provider-portfolio/provider/' + id);
  }


  private handleError(error: Response) {
    return throwError(error);
  }
}
