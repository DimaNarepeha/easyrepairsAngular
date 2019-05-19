import {Component, OnInit, NgZone} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {componentRefresh, refreshDescendantViews} from '@angular/core/src/render3/instructions';
import {ServiceProviders} from '../service-providers';
import {ServiceProvidersService} from '../service-providers.service';
import {ProviderLocatoin} from '../../location/provider-locatoin';

@Component({
  selector: 'app-update-service-provider',
  templateUrl: './update-service-provider.component.html',
  styleUrls: ['./update-service-provider.component.css']
})
export class UpdateServiceProviderComponent implements OnInit {

  serviceProvider = new ServiceProviders();
  public userFile: any = File;

  public title = 'Places';
  public addrKeys: string[];
  public addr: object;

  providerLocation = new ProviderLocatoin();


  constructor(private serviceProvidersService: ServiceProvidersService, private rout: ActivatedRoute, private zone: NgZone) {
    // this.rout.params.subscribe(next => {
    //   this.serviceProvidersService.getServiceProviderById(next['id']).subscribe(next => {
    //     this.serviceProvider = next;
    //   }, err => {
    //     console.log(err);
    //   });
    // }, err => {
    //   console.log(err);
    // });
  }

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys);
    });
  }

  onSelectFile(event, id) {
    const file = event.target.files[0];
    console.log(file);
    this.userFile = file;
    this.serviceProvidersService.uploadImage(file, id);
  }


  updateService(id: number): void {
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
    this.serviceProvidersService.updateServiceProvider(id, this.providerLocation)
      .subscribe((response) => {
        console.log(response);
        alert('Provider updated!');
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.rout.params.subscribe(next => {
      this.serviceProvidersService.getServiceProviderById(next['id']).subscribe(next => {
        this.serviceProvider = next;
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }

}
