import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
import {HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Customer } from './customer';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { environment } from 'src/environments/environment';


@Injectable()
export class CustomerService{
    
    constructor(private _httpService: Http,private _sanitizer: DomSanitizer){};

        uploadImage(file:any,id:number){
        const formData = new FormData();
        formData.append('imageFile',file);
        return  this._httpService.post(environment.customer_url+id+"/image",formData);
       
    }

    getImage(image:string):Observable<any>{
       /* const params = new HttpParams()
        .append('imageName', image);*/
        
           
                return this._httpService.get(environment.customer_url+"image/"+image);
    }

    getCustomersPage(page:Number){
        
        return  this._httpService.get(environment.customer_url+"list?page="+page);
    }
    getAllCustomers(): Observable <Customer[]>{
           return this._httpService.get(environment.customer_url).
            map( (response: Response) => response.json()).catch(this.handleError);
    }
   
    addCustomer(customer:Customer){
        let body = JSON.stringify(customer);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: headers});
        if(customer.id){
            let c = customer.id;
            customer.id = null; 
            return this._httpService.put(environment.customer_url+c,body,options);
            
        }
        else{return this._httpService.post(environment.customer_url,body,options);}
    }
    deleteCustomer(customerId:string){
       return this._httpService.delete(environment.customer_url+customerId);
}

    getCustomerById(customerId:string):Observable<Customer>{
           return  this._httpService.get(environment.customer_url+customerId)
            .map((response: Response)=>response.json())
            .catch(this.handleError);
    }
    private handleError(error: Response){
            return Observable.throw(error);
    }
}
