import {Component, OnInit} from '@angular/core';
import {ProviderStatus} from '../../service-providers/service-provider.status';
import {AdminApprovePageComponent} from '../admin-approve-page.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  // providerStatus: typeof ProviderStatus;
  status: ProviderStatus;
  statuses: ProviderStatus [] = [ProviderStatus.NOTAPPROVED,ProviderStatus.APPROVED,ProviderStatus.MODIFIED,ProviderStatus.BLOCKED];


  constructor(private adminApprovePageComponent : AdminApprovePageComponent) {}  


  setStatus() {
    console.log(this.status);
    this.adminApprovePageComponent.setStatusForAllServiceProviders(this.status);
  }
  

  ngOnInit() {
    this.status = ProviderStatus.NOTAPPROVED;
  }

}
