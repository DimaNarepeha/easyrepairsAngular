import {Injectable} from '@angular/core';
import {RequestOptions, Http, Response, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Portfolio} from './portfolio';
import {Post} from './post';
import {NotifierService} from 'angular-notifier';
import {ApiService} from "../core/api.service";

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json'
  });

@Injectable()
export class PortfolioService {
  private readonly baseURL;
  private readonly notifier: NotifierService;

  constructor(private httpService: Http, private http: HttpClient, notifierService: NotifierService, private apiService: ApiService) {
    this.baseURL = environment.baseURL;
    this.notifier = notifierService;
  }

  getPortfolioById(id: number): Observable<Portfolio> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    return this.httpService.get(this.baseURL + '/provider-portfolio/' + id, options)
      .map((response: Response) => response.json());
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(this.baseURL + '/provider-portfolio/post/' + id + '?access_token=' + this.apiService.returnAccessToken());
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.baseURL + '/provider-portfolio/post/' + post.id + '?access_token=' + this.apiService.returnAccessToken(), JSON.stringify(post), {headers});
  }

  uploadImage(file: any, id: number) {
    const formData = new FormData();
    formData.append('imageFile', file);
    return this.httpService.post(this.baseURL + '/provider-portfolio/post/image/' + id + '?access_token=' + this.apiService.returnAccessToken(), formData)
      .subscribe(res => {
        console.log(res);
        this.notifier.notify('success', 'photo updated');
        location.reload();
      });
  }

  uploadPhotoForAdding(file: any, id: number) {
    const formData = new FormData();
    formData.append('imageFile', file);
    return this.httpService.post(this.baseURL + '/provider-portfolio/post/image/' + id + '?access_token=' + this.apiService.returnAccessToken(), formData)
      .subscribe(res => {
        console.log(res);
        this.notifier.notify('success', 'Post has been added');
      });
  }

  deletePost(post: Post): Observable<Post> {
    return this.http.delete<Post>(this.baseURL + '/provider-portfolio/post/' + post.id + '?access_token=' + this.apiService.returnAccessToken(), {headers});
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseURL + '/provider-portfolio/post' + '?access_token=' + this.apiService.returnAccessToken(), JSON.stringify(post), {headers});
  }
}









