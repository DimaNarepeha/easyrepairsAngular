import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceProviders} from '../service-providers';
import {ServiceProvidersService} from '../service-providers.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-service-provider-one',
  templateUrl: './service-provider-one.component.html',
  styleUrls: ['./service-provider-one.component.css']
})
export class ServiceProviderOneComponent implements OnInit {

  serviceProvider = new ServiceProviders();
  private url = environment.baseURL + '/service-providers/image/';
  private role: any;
  private currentId: any;
  private userId: any;


  constructor(private serviceProvidersService: ServiceProvidersService, private rout: ActivatedRoute) {
    this.userId = JSON.parse(window.sessionStorage.getItem('user')).id;
  }


  public isAdmin() {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'ADMIN';
  }

  public isCurentProvider(id: number) {
    this.currentId = JSON.parse(window.sessionStorage.getItem('user')).id;
    return this.currentId === id;
  }


  public isCustomer(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'CUSTOMER';
  }

  public isProvider(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'PROVIDER';
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.rout.params.subscribe(next => {
      this.serviceProvidersService.getServiceProviderById(next.id).subscribe(next => {
        this.serviceProvider = next;
        console.log(this.serviceProvider);
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }


}
