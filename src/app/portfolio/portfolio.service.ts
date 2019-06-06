import {Injectable} from '@angular/core';
import {RequestOptions, Http, Response, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Portfolio} from './portfolio';




@Injectable()
export class PortfolioService {

  private readonly baseURL;

  constructor(private httpService: Http, private http: HttpClient) {
    this.baseURL = environment.baseURL;
  }
  getPortfolioById(id: number): Observable<Portfolio> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    return this.httpService.get(this.baseURL + '/provider-portfolio/' + id, options)
      .map((response: Response) => response.json());
  }
}









