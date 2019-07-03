import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly baseURL;

  constructor(private router: Router, private service: ApiService, private http: HttpClient) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.service.returnAccessToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          access_token: token
        }
      });
    }

    // @ts-ignore
    return next.handle(req).catch(error => {
      console.log(error);
      if (error.error.message === 'Access token expired: ' + this.service.returnAccessToken()) {
          // Genrate params for token refreshing
          const headers = new HttpHeaders({
            grant_type: 'refresh_token',
            refresh_token: this.service.returnRefreshToken()
          });
          return this.http.post(this.baseURL, {headers}).flatMap(
            (data: any) => {
              // If reload successful update tokens
              if (data.status === 200) {
                // Update tokens
                window.sessionStorage.setItem('token', JSON.stringify(data));
                console.log(window.sessionStorage.getItem('token'));
                // Clone our fieled request ant try to resend it
                req = req.clone({
                  setHeaders: {
                    access_token: this.service.returnAccessToken()
                  }
                });
                // @ts-ignore
                return next.handle(req).catch(err => {
                  // Catch another error
                  err.toString();
                });
              } else {
                // Logout from account
                this.service.logoutme().subscribe();
              }
            }
          );
        } else {
          // Logout from account or do some other stuff
        }
      return Observable.throw(error);
    });

  }
}
