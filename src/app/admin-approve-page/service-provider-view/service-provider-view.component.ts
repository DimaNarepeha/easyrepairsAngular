import {Component, OnInit} from '@angular/core';
import {ServiceProviders} from 'src/app/service-providers/service-providers';
import {ServiceProvidersService} from 'src/app/service-providers/service-providers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Email} from "../Email";
import {ProviderStatus} from "../../service-providers/service-provider.status";


@Component({
  selector: 'app-service-provider-view',
  templateUrl: './service-provider-view.component.html',
  styleUrls: ['./service-provider-view.component.css']
})
export class ServiceProviderViewComponent implements OnInit {

  serviceProviders: ServiceProviders[];

  email: Email = new Email();
  emailText: string = 'Hi! There are some mistakes in your profile and and if you want us to confirm it you have to make ' +
    'the following changes: \n 1) ... \n 2) ... \n 3) ... ';
  emailTopic = 'Support';
  serviceProvider = new ServiceProviders();
  providerPage: Array<any>;
  private pages: Array<number>;
  public userFile: any = File;
  private pageNumber = 0;
  private numberOfProvidersOnPage = 4;
  private status: ProviderStatus;
  private selectedStatus: ProviderStatus = this.status;
  statuses: ProviderStatus [] = [ProviderStatus.NOTAPPROVED, ProviderStatus.APPROVED, ProviderStatus.MODIFIED, ProviderStatus.BLOCKED];

  constructor(private serviceProvidersService: ServiceProvidersService ,private router: Router, private rout: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.status = ProviderStatus.NOTAPPROVED;
    this.getServiceProvidersByStatus(this.pageNumber, this.numberOfProvidersOnPage, this.status);
  }

  setStatusForAllServiceProviders(status: ProviderStatus) {
    this.status = status;
    this.getServiceProvidersByStatus(this.pageNumber, this.numberOfProvidersOnPage, this.status);
  }

  getServiceProvidersByStatus(page: number, numberOfProvidersOnPage: number, status: ProviderStatus): void {
    this.serviceProvidersService.getServiceProvidersByStatus(page, numberOfProvidersOnPage, status).subscribe((serviceProvidersData) => {
        this.serviceProviders = serviceProvidersData['content'],
          this.pages = new Array(serviceProvidersData['totalPages']);
        console.log('serviceProviders = ' + this.serviceProviders);
      },
      (error) => {
        console.log(error);
      });
  }

  updateServiceProviderStatus(id: number, status: ProviderStatus) {
    this.serviceProvider.status= status;
    console.log(this.serviceProvider);
    this.serviceProvidersService.updateServiceProviderStatus(id, this.serviceProvider).subscribe((serviceProvidersData) => {
        this.serviceProvider = serviceProvidersData;
        this.setPage(this.pageNumber,event)
      },
      (error) => {
        console.log(error);
      });
  }

  sendEmail(addressedTo: string) {
    this.email.subject = this.emailTopic;
    this.email.text = this.emailText;
    this.email.addressedTo = addressedTo;
    this.serviceProvidersService.sendEmailToUser(this.email).subscribe((response) => {
      console.log(response);
      alert('Email sended!');
    }, (error) => {
      console.log(error);
    });
  }

  setPage(pageNumber,event: any) {
    event.preventDefault();
    this.pageNumber = pageNumber;
    this.getServiceProvidersByStatus(this.pageNumber,this.numberOfProvidersOnPage,this.status);
    window.scroll(0,0);
  }

  getServiceProvidersByName(searchName: string): void {
    this.serviceProvidersService.getServiceProvidersByName(searchName,this.pageNumber, this.numberOfProvidersOnPage, this.status).subscribe((serviceProvidersData) => {
        this.serviceProviders = serviceProvidersData['content'],
          this.pages = new Array(serviceProvidersData['totalPages']);
        console.log('serviceProvidersData = ' + serviceProvidersData);
      },
      (error) => {
        console.log(error);
      });
  }


  ngOnInit() {
  }
}






















