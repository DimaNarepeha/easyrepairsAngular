import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('junior-client:junior-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return this.http.post('http://localhost:8080/' + 'oauth/token', loginPayload, {headers});
  }
}
