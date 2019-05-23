import {Component, OnInit} from '@angular/core';
import {ServiceProviders} from 'src/app/service-providers/service-providers';
import {ServiceProvidersService} from 'src/app/service-providers/service-providers.service';
import {AdminApprovePageService} from './admin-approve-page.service';
import {Email} from './Email';
import {ProviderStatus} from '../service-providers/service-provider.status';
import {ActivatedRoute, Navigation, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-admin-approve-page',
  templateUrl: './admin-approve-page.component.html',
  styleUrls: ['./admin-approve-page.component.css']
})
export class AdminApprovePageComponent implements OnInit {

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

  constructor(private serviceProvidersService: ServiceProvidersService,
              private adminApproveService: AdminApprovePageService, private router: Router, private rout: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  setStatusForAllServiceProviders(status: ProviderStatus) {
    this.status = status;
    this.getServiceProvidersByStatus(this.pageNumber, this.numberOfProvidersOnPage, this.status);
  }

  getServiceProvidersByStatus(page: number, numberOfProvidersOnPage: number, status: ProviderStatus): void {
    this.serviceProvidersService.getServiceProvidersByStatus(page, numberOfProvidersOnPage, status).subscribe((serviceProvidersData) => {
      this.serviceProviders = serviceProvidersData,
        console.log('serviceProvidersData = ' + serviceProvidersData);
      },
      (error) => {
        console.log(error);
      });
  }

  updateServiceProviderStatus(id: number, status: ProviderStatus) {
    this.serviceProvider.status = status;
    console.log(this.serviceProvider);
    this.serviceProvidersService.updateServiceProviderStatus(id, this.serviceProvider).subscribe((serviceProvidersData) => {
        this.serviceProviders = serviceProvidersData;
        window.location.reload();
      },
      (error) => {
        console.log(error);
      });
  }

  sendEmail(addressedTo: string) {
    this.email.subject = this.emailTopic;
    this.email.text = this.emailText;
    this.email.addressedTo = addressedTo;
    this.adminApproveService.sendEmailToUser(this.email).subscribe((response) => {
      console.log(response);
      alert('Email sended!');
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.status = ProviderStatus.NOTAPPROVED;
    this.getServiceProvidersByStatus(this.pageNumber, this.numberOfProvidersOnPage, this.status);
  }

}

