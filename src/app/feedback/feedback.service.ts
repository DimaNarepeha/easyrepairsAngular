import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {Feedback} from './feedback';


@Injectable()
export class FeedbackService {

  private readonly baseURL;

  constructor(private httpService: Http) {
    this.baseURL = environment.baseURL;
  }

  getAllFeedback(): Observable<Feedback[]> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    return this.httpService.get(this.baseURL + '/feedback/find-all', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  addFeedback(feedbck: Feedback): Observable<Feedback> {
    const body = JSON.stringify(feedbck);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});

    return this.httpService.post(this.baseURL + '/feedback/save', body, options)
      .map((response: Response) => response.json());

  }

  updateFeedback(feedback: Feedback): Observable<Feedback> {
    const body = JSON.stringify(feedback);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});

    return this.httpService.put(this.baseURL + '/feedback/update', body, options)
      .map((response: Response) => response.json());
  }

  getFeedbackById(id: number): Observable<Feedback> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    return this.httpService.get(this.baseURL + '/feedback/find-by-id/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  deleteFeedback(id: number) {
    return this.httpService.delete(this.baseURL + '/feedback/delete/' + id);
  }

  getFeedbackByUserId(id: any): Observable<Feedback[]> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    return this.httpService.get(this.baseURL + '/feedback/find-by-user-id/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return throwError(error);
  }

}
