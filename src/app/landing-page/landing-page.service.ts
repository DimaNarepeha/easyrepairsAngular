import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ServiceProviders} from '../service-providers/service-providers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {RequestOptions, Http, Response, Headers} from '@angular/http';
import {throwError} from 'rxjs';
import {ProvidersInfo} from '../core/model/providers-info';
import {Feedback} from '../core/model/feedback';
import {Service} from '../core/model/service';
import { ProvidersCriteria } from '../core/model/providers-criteria';


@Injectable()
export class LandingPageService {
  private url = 'http://localhost:8080/';
  private allapproved = 'landing-page/all-approved';
  private comments = 'landing-page/top-comment';
  private services = 'services/get-all';
  private filter= 'landing-page/filter';

  constructor(private http: HttpClient, private httpService: Http) {
  }

  getApprovedProviders(): Observable<ProvidersInfo[]> {
    return this.http.get<ProvidersInfo[]>(this.url + this.allapproved );
  }

  getLatestComments(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.url + this.comments);
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.url + this.services);
  }

sortProviders(sortP:  ProvidersInfo[], orderby: number): ProvidersInfo[] {
  console.log('dd1f');
  if (orderby === 1) {
    sortP.sort((a, b) => a.name.localeCompare(b.name));

    }
    if (orderby === 2) {
    sortP.sort((a, b) => a.raiting.localeCompare(b.raiting));
    console.log('ddf');
  }
    if (orderby === 3) {
    sortP.sort((a, b) => a.registrationDate.localeCompare(b.registrationDate));
  }
    return sortP;
}


  findProvidersByParams(params: ProvidersCriteria): Observable<ProvidersInfo[]> {
    params.location ='Lviv';
    params.minRating = 3;

    let body = JSON.stringify(params);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.httpService.post(this.url + this.filter, body, options)
      .map((response: Response) => response.json());
  }
}
