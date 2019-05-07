import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ServiceProviders} from './service-providers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {RequestOptions, Http, Response, Headers} from '@angular/http';
import {throwError} from 'rxjs';

@Injectable()
export class ServiceProvidersService {

  constructor(private httpService: Http) {
  }

  getServiceProvidersByPage(page:Number){
    return  this.httpService.get("http://localhost:8080/api/find-all/page/?page="+page)
    .map((response: Response) => response.json())
      .catch(this.handleError);;
}


uploadImage(file:any,id:number){
  const formData = new FormData();
  formData.append('imageFile',file);
  let headers = new Headers({'Access-Control-Allow-Origin': 'http://localhost:8080'});
  let options = new RequestOptions({headers: headers});
  return  this.httpService.post("http://localhost:8080/api/"+id,formData, options)
  .subscribe(res => {
      console.log(res);
      alert('SUCCESS !!');
    });
}
  getAllServiceProviders(): Observable<ServiceProviders[]> {
    let headers = new Headers({'Access-Control-Allow-Origin': 'http://localhost:8080'});
    let options = new RequestOptions({headers: headers});
    return this.httpService.get(`http://localhost:8080/api/find-all`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  addServiceProviders(service: ServiceProviders): Observable<ServiceProviders> {
    let body = JSON.stringify(service);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
  
    return this.httpService.post('http://localhost:8080/api/save', body, options)
      .map((response: Response) => response.json());
  
  }

  updateServiceProvider(id: number, service: ServiceProviders): Observable<ServiceProviders> {
    let body = JSON.stringify(service);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.httpService.put('http://localhost:8080/api/update/' + id, body, options)
    .map((response: Response) => response.json());
  }

  getServiceProviderById(id: number): Observable<ServiceProviders> {
    let headers = new Headers({'Access-Control-Allow-Origin': 'http://localhost:8080'});
    let options = new RequestOptions({headers: headers});
    return this.httpService.get('http://localhost:8080/api/find-one/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);;
  }

  deleteServiceProvider(id: number) {
    return this.httpService.delete('http://localhost:8080/api/delete/' + id);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}
