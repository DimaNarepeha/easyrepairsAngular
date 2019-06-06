import {Component, OnInit} from '@angular/core';
import {ServiceProviders} from '../service-providers/service-providers';
import {environment} from '../../environments/environment';
import {ServiceProvidersService} from '../service-providers/service-providers.service';
import {ActivatedRoute} from '@angular/router';
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {Customer} from "../customer/customer";
import {CustomerService} from "../customer/customer.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  serviceProvider = new ServiceProviders();
  customer = new Customer();
  private url = environment.baseURL + '/service-providers/image/';
  private urlCustomer = environment.baseURL + '/customers/image/';
  private userId: any;
  private role: string;

  constructor(private serviceProvidersService: ServiceProvidersService, private customerService: CustomerService, private rout: ActivatedRoute) {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    this.userId = JSON.parse(window.sessionStorage.getItem('user')).id;
  }


  public isCustomer() {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'CUSTOMER';
  }

  public isProvider() {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'PROVIDER';
  }


  ngOnInit() {
    if (this.role == 'PROVIDER') {
      this.rout.params.subscribe(next => {
        this.serviceProvidersService.getServiceProviderByUserId(this.userId).subscribe(next => {
          this.serviceProvider = next;
          console.log(this.serviceProvider);
        }, err => {
          console.log(err);
        });
      }, err => {
        console.log(err);
      });
    } else if (this.role == 'CUSTOMER') {
      this.rout.params.subscribe(next => {
        this.customerService.getCustomerByUserId(this.userId).subscribe(next => {
          this.customer = next;
          console.log(this.customer);
        }, err => {
          console.log(err);
        });
      }, err => {
        console.log(err);
      });
    }
  }

}
