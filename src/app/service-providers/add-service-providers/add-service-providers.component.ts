import {Component, OnInit, NgZone} from '@angular/core';
import {Validators} from '@angular/forms';
import {ServiceProviders} from '../service-providers';
import {ServiceProvidersService} from '../service-providers.service';
import {ProviderLocatoin} from '../../location/provider-locatoin';

@Component({
  selector: 'app-add-service-providers',
  templateUrl: './add-service-providers.component.html',
  styleUrls: ['./add-service-providers.component.css']
})
export class AddServiceProvidersComponent implements OnInit {

  serviceProvider = new ServiceProviders();
  public userFile: any = File;

  public title = 'Places';
  public addrKeys: string[];
  public addr: object;
  providerLocation = new ProviderLocatoin();
  location = new Location();


  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys);
      console.log(this.addr);
    });
  }

  constructor(private serviceProvidersService: ServiceProvidersService, private zone: NgZone) {
  }

  ngOnInit() {
  }

  addServicerovider(): void {
    this.providerLocation.id = this.serviceProvider.id;
    this.providerLocation.name = this.serviceProvider.name;
    this.providerLocation.email = this.serviceProvider.email;
    this.providerLocation.description = this.serviceProvider.description;
    // @ts-ignore
    this.providerLocation.country = this.addr.country;
    // @ts-ignore
    this.providerLocation.city = this.addr.locality;
    // @ts-ignore
    this.providerLocation.region = this.addr.admin_area_l1;
    console.log(this.providerLocation);
    this.serviceProvidersService.addServiceProviders(this.serviceProvider)
      .subscribe((response) => {
        console.log(response);
        alert('Provider saved!');
      }, (error) => {
        console.log(error);
      });
  }


}
