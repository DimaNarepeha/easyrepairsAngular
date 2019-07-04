import {Component, Input, OnInit} from '@angular/core';
import {ProviderStatus} from '../../service-providers/service-provider.status';
import {ServiceProviderViewComponent} from "../service-provider-view/service-provider-view.component";
import {AdminApprovePageComponent} from "../admin-approve-page.component";
import {ActivatedRoute} from "@angular/router";
import {CustomerStatus} from "../../customer/CustomerStatus";
import {CustomerViewComponent} from "../customer-view/customer-view.component";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})

export class MenuBarComponent implements OnInit {
  @Input() showForServiceProviders: boolean;
  @Input() showForCustomers: boolean;
  serviceProviderStatus: ProviderStatus;
  customerStatus: CustomerStatus;
  searchName: string;
  providerStatuses: ProviderStatus [] = [ProviderStatus.NOTAPPROVED, ProviderStatus.APPROVED, ProviderStatus.MODIFIED, ProviderStatus.BLOCKED];
  customerStatuses: CustomerStatus [] = [CustomerStatus.ACTIVE, CustomerStatus.BLOCKED];


  constructor(private route: ActivatedRoute, private adminApprovePageComponent: AdminApprovePageComponent, private serviceProviderViewComponent: ServiceProviderViewComponent, private customerViewComponent :CustomerViewComponent) {
  }


  setServiceProviderStatus() {
    this.serviceProviderViewComponent.setStatusForAllServiceProviders(this.serviceProviderStatus);
  }

  setCustomerStatus() {
    this.customerViewComponent.setStatusForAllCustomers(this.customerStatus);
  }


  ngOnInit() {
    this.serviceProviderStatus = ProviderStatus.NOTAPPROVED;
    this.customerStatus = CustomerStatus.ACTIVE;
  }

}
