import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {Feedback} from './feedback';
import {ApiService} from '../core/api.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {ExceptionHandler} from '../global-exception-handler/exception-handler';

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;'
  });

@Injectable()
export class FeedbackService {

  private readonly baseURL;
  private readonly notifier: NotifierService;
  private exception: ExceptionHandler;

  constructor(private httpService: HttpClient, private apiService: ApiService, private notifierService: NotifierService,
              private router: Router, private exceptionHandler: ExceptionHandler) {
    this.baseURL = environment.baseURL;
    this.notifier = notifierService;
    this.exception = exceptionHandler;
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.httpService.get<Feedback[]>(this.baseURL + '/feedback/find-all', {headers})
      .catch(err => this.exception.handleError(err));

  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.httpService.post<Feedback>(this.baseURL + '/feedback/save' + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(feedback), {headers})
      .catch(err => this.exception.handleError(err));

  }

  updateFeedback(feedback: Feedback): Observable<Feedback> {
    return this.httpService.put<Feedback>(this.baseURL + '/feedback/update' + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(feedback), {headers})
      .catch(err => this.exception.handleError(err));
  }

  getFeedbackById(id: number): Observable<Feedback> {
    return this.httpService.get<Feedback>(this.baseURL + '/feedback/find-by-id/' + id + '&access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(err => this.exception.handleError(err));

  }

  deleteFeedback(id: number) {
    return this.httpService.delete(this.baseURL + '/feedback/delete/' + id + '?access_token='
      + this.apiService.returnAccessToken())
      .catch(err => this.exception.handleError(err));
  }

  getFeedbackByUserId(id: any): Observable<Feedback[]> {
    return this.httpService.get<Feedback[]>(this.baseURL + '/feedback/find-by-user-id/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(err => this.exception.handleError(err));
  }
}
