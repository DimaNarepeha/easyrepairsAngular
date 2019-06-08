import {Component, OnInit} from '@angular/core';
import {ServiceProviders} from './service-providers';
import {ServiceProvidersService} from './service-providers.service';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.css']
})
export class ServiceProvidersComponent implements OnInit {

  private page = 0;
  serviceProviders: ServiceProviders[];
  serviceProvider = new ServiceProviders();
  private providerPage: Array<any>;
  private pages: Array<number>;
  public userFile: any = File;
  role: string;
  currentId: any;
  private url = environment.baseURL + '/service-providers/image/';
  private readonly notifier: NotifierService;

  constructor(private serviceProvidersService: ServiceProvidersService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getServiceProvidersByPage();
    // this.serviceProviders = this.providerPage;
    // console.log(this.serviceProviders);
  }

  public isUser() {
    return window.sessionStorage.getItem('user') != null;
  }

  public isAdmin() {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'ADMIN';
  }

  public isCurentProvider(id: number) {
    this.currentId = JSON.parse(window.sessionStorage.getItem('user')).id;
    return this.currentId === id;
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getServiceProvidersByPage();

  }

  onSelectFile(file1, id) {
    const file = file1;
    console.log(file);
    this.userFile = file;
    this.serviceProvidersService.uploadImage(file, id);
  }

  getServiceProvidersByPage() {
    this.serviceProvidersService.getServiceProvidersByPage(this.page)
      .subscribe(
        data => {
          console.log(data);
          const d = data;
          console.log(d);
          // console.log("result = " + d.result);
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

  getServiceProviders(): void {
    this.serviceProvidersService.getAllServiceProviders()
      .subscribe((serviceProvidersData) => {
          this.serviceProviders = serviceProvidersData, console.log(serviceProvidersData);
        },
        (error) => {
          console.log(error);
        });
  }

  private reset() {
    this.serviceProvider.id = null;
    this.serviceProvider.name = null;
  }

  getServiceProviderById(id: number) {
    this.serviceProvidersService.getServiceProviderById(id)
      .subscribe((serviceProvidersData) => {
          this.serviceProvider = serviceProvidersData;
        },
        (error) => {
          console.log(error);
        });
  }

  deleteService(id: number) {
    this.serviceProvidersService.deleteServiceProvider(id)
      .subscribe((response) => {
        this.notifier.notify('error', 'deleted!')
        this.getServiceProvidersByPage();
      }, (error) => {
        console.log(error);
      });
  }


}
