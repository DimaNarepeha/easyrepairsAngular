import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ServiceProviders} from '../service-providers/service-providers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {RequestOptions, Http, Response, Headers} from '@angular/http';
import {throwError} from 'rxjs';
import {ProvidersInfo} from '../core/model/providers-info';
import {Feedback} from '../core/model/feedback';
import {Service} from '../core/model/service';
import {ProvidersCriteria} from '../core/model/providers-criteria';
import {environment} from 'src/environments/environment';
import {FilterComponent} from '../filter/filter.component';


@Injectable()
export class LandingPageService {

  private url = environment.baseURL;
  private comments = '/landing-page/top-four-comment';
  private services = '/services';
  private filterPage = '/landing-page/providers/search-param/?page=';
  private filterPageSize = '&numberOfProvidersOnPage=';

  constructor(private http: HttpClient, private httpService: Http) {

  }
  getProviderInfoByPage(page: number, pageSize: number, params: HttpParams) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    console.log(this.url + this.filterPage + page + this.filterPageSize + pageSize + '&' + params);
    return this.httpService.get(this.url + this.filterPage + page + this.filterPageSize + pageSize + '&' + params)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return throwError(error);
  }
  getLatestComments(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.url + this.comments);
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.url + this.services);
  }
}
