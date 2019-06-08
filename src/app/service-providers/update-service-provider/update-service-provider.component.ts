import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceProviders} from '../service-providers';
import {ServiceProvidersService} from '../service-providers.service';
import {environment} from '../../../environments/environment';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-update-service-provider',
  templateUrl: './update-service-provider.component.html',
  styleUrls: ['./update-service-provider.component.css']
})
export class UpdateServiceProviderComponent implements OnInit {

  serviceProvider = new ServiceProviders();
  public userFile: any = File;
  private url = environment.baseURL + '/service-providers/image/';
  private readonly notifier: NotifierService;
  public addrKeys: string[];
  public addr: object;


  constructor(private serviceProvidersService: ServiceProvidersService, private rout: ActivatedRoute,
              private zone: NgZone, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys);
      // @ts-ignore
      this.serviceProvider.location.country = this.addr.country;
      // @ts-ignore
      this.serviceProvider.location.city = this.addr.locality;
      // @ts-ignore
      this.serviceProvider.location.region = this.addr.admin_area_l1;
    });
  }

  onSelectFile(event, id) {
    const file = event.target.files[0];
    console.log(file);
    this.userFile = file;
    this.serviceProvidersService.uploadImage(file, id);
  }


  updateService(): void {
    this.serviceProvidersService.updateServiceProvider(this.serviceProvider)
      .subscribe((response) => {
        console.log(response);
        this.notifier.notify('success', 'Provider updated!');
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.rout.params.subscribe(next => {
      this.serviceProvidersService.getServiceProviderById(next.id).subscribe(next => {
        this.serviceProvider = next;
        console.log(next);
        console.log(this.serviceProvider);
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }

}
