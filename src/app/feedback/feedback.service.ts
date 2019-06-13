import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {Feedback} from './feedback';
import {ApiService} from '../core/api.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;'
  });

@Injectable()
export class FeedbackService {

  private readonly baseURL;
  private readonly notifier: NotifierService;

  constructor(private httpService: HttpClient, private apiService: ApiService, private notifierService: NotifierService, private router: Router) {
    this.baseURL = environment.baseURL;
    this.notifier = notifierService;
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.httpService.get<Feedback[]>(this.baseURL + '/feedback/find-all', {headers})
      .catch(
        err => this.handleError(err)
      );

  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.httpService.post<Feedback>(this.baseURL + '/feedback/save' + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(feedback), {headers})
      .catch(err => this.handleError(err));

  }

  updateFeedback(feedback: Feedback): Observable<Feedback> {
    return this.httpService.put<Feedback>(this.baseURL + '/feedback/update' + '?access_token='
      + this.apiService.returnAccessToken(), JSON.stringify(feedback), {headers})
      .catch(err => this.handleError(err));
  }

  getFeedbackById(id: number): Observable<Feedback> {
    return this.httpService.get<Feedback>(this.baseURL + '/feedback/find-by-id/' + id + '&access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(err => this.handleError(err));

  }

  deleteFeedback(id: number) {
    return this.httpService.delete(this.baseURL + '/feedback/delete/' + id + '?access_token='
      + this.apiService.returnAccessToken())
      .catch(err => this.handleError(err));
  }

  getFeedbackByUserId(id: any): Observable<Feedback[]> {
    return this.httpService.get<Feedback[]>(this.baseURL + '/feedback/find-by-user-id/' + id + '?access_token='
      + this.apiService.returnAccessToken(), {headers})
      .catch(err => this.handleError(err));
  }

  private handleError(error: Response): Observable<any> {
    if ((error.status === 404) || (error.status === 400)) {
      console.log(error);
      this.notifier.notify('error', 'This page not found, sorry try again');
      this.router.navigate(['/not-found']);
    } else {
      console.log(error);
    }
    return throwError(error);
  }

}
