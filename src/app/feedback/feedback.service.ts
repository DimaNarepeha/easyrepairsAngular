import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {Feedback} from './feedback';
import {ApiService} from '../core/api.service';

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;'
  });

@Injectable()
export class FeedbackService {

  private readonly baseURL;

  constructor(private httpService: HttpClient, private apiService: ApiService) {
    this.baseURL = environment.baseURL;
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.httpService.get<Feedback[]>(this.baseURL + '/feedback/find-all', {headers})
      .catch(this.handleError);

  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.httpService.post<Feedback>(this.baseURL + '/feedback/save' + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(feedback), {headers})
      .catch(this.handleError);

  }

  updateFeedback(feedback: Feedback): Observable<Feedback> {
    return this.httpService.put<Feedback>(this.baseURL + '/feedback/update' + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(feedback), {headers})
      .catch(this.handleError);
  }

  getFeedbackById(id: number): Observable<Feedback> {
    return this.httpService.get<Feedback>(this.baseURL + '/feedback/find-by-id/' + id + '&access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);

  }

  deleteFeedback(id: number) {
    return this.httpService.delete(this.baseURL + '/feedback/delete/' + id + '?access_token='
      + this.apiService.returnAccessToken())
      .catch(this.handleError);
  }

  getFeedbackByUserId(id: any): Observable<Feedback[]> {
    return this.httpService.get<Feedback[]>(this.baseURL + '/feedback/find-by-user-id/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return throwError(error);
  }

}
