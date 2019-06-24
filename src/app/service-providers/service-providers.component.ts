import {Component, OnInit} from '@angular/core';
import {ServiceProviders} from './service-providers';
import {ServiceProvidersService} from './service-providers.service';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {NotifierService} from 'angular-notifier';
import {FavouriteService} from "../favorite/favourite.service";
import {CustomerService} from "../customer/customer.service";

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.css']
})
export class ServiceProvidersComponent implements OnInit {

  private page = 0;
  serviceProviders: ServiceProviders[];
  favouriteServiceProviders: ServiceProviders[];
  serviceProvider = new ServiceProviders();
  private providerPage: Array<any>;
  private pages: Array<number>;
  public userFile: any = File;
  role: string;
  currentId: any;
  private userId: number;
  private customerId: number;
  private url = environment.baseURL + '/service-providers/image/';
  private readonly notifier: NotifierService;

  constructor(private serviceProvidersService: ServiceProvidersService,private customerService:CustomerService,private favouriteService :FavouriteService,notifierService: NotifierService) {
    this.notifier = notifierService;
  }


  ngOnInit() {
    this.userId = JSON.parse(window.sessionStorage.getItem('user')).id;
    this.customerService.getCustomerByUserId(this.userId).subscribe((serviceProvidersData) => {
      this.customerId = serviceProvidersData.id;
      this.favouriteService.getFavouriteServiceProviders(this.customerId).subscribe(providers => {
        this.favouriteServiceProviders = providers['favourites'];
      });
    });
    this.getServiceProvidersByPage();
  }
  checkFavouriteProvider(serviceProvider: ServiceProviders): boolean {
    if (this.favouriteServiceProviders.map(provider => provider.id).includes(serviceProvider.id)) {
      return true;
    } else {
      return false;
    }
  }

  private isCustomer(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'CUSTOMER';
  }

  public isAdmin() {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'ADMIN';
  }

  public isCurrentProvider(id: number) {
    this.currentId = JSON.parse(window.sessionStorage.getItem('user')).id;
    return this.currentId === id;
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getServiceProvidersByPage();

  }


  getServiceProvidersByPage() {
    this.serviceProvidersService.getServiceProvidersByPage(this.page)
      .subscribe(
        data => {
          console.log(data);
          const d = data;
          console.log(d);
          this.serviceProviders = data.content;
          this.pages = new Array(d.totalPages);
          console.log(data.content);
          console.log(this.pages);
          console.log(this.providerPage);
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }


  deleteService(id: number) {
    this.serviceProvidersService.deleteServiceProvider(id)
      .subscribe((response) => {
        this.notifier.notify('error', 'Deleted')
        this.getServiceProvidersByPage();
      }, (error) => {
        console.log(error);
      });
  }


  addToFavourite(serviceProvider: ServiceProviders) {
    this.favouriteService.addToFavourite(this.customerId, serviceProvider).subscribe(
      this.ngOnInit());
  }
}
