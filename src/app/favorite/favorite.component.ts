import { Component, OnInit } from '@angular/core';
import {ServiceProviders} from "../service-providers/service-providers";
import {FavouriteService} from "./favourite.service";
import {environment} from "../../environments/environment";
import {Customer} from "../registration/customer";
import {CustomerService} from "../customer/customer.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  serviceProviders: Array<ServiceProviders>;

  customer: Customer;
  customerId: any;
  userId: number;

  constructor(private favouriteService :FavouriteService, private customerService :CustomerService) {
  }

  checkFavourite(serviceProvider: ServiceProviders): boolean {
    return true;
  }

  addToFavourite(serviceProvider: ServiceProviders) {
    this.favouriteService.addToFavourite(this.customerId, serviceProvider).subscribe(data => {
      console.log(data);
    });
    this.ngOnInit();
  }

  ngOnInit() {
    this.userId = JSON.parse(window.sessionStorage.getItem('user')).id;
    this.customerService.getCustomerByUserId(this.userId).subscribe((serviceProvidersData) => {
        this.customerId = serviceProvidersData.id;
        console.log("customerId" + this.customerId);
        this.favouriteService.getFavouriteServiceProviders(this.customerId).subscribe((serviceProvider) =>{
          this.serviceProviders = serviceProvider['favourites'];
        })
      },
      (error) => {
        console.log(error);
      });
  }
}
