import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceProviders} from '../service-providers';
import {ServiceProvidersService} from '../service-providers.service';
import {environment} from '../../../environments/environment';
import {NotifierService} from 'angular-notifier';
import {Service} from '../service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-service-provider',
  templateUrl: './update-service-provider.component.html',
  styleUrls: ['./update-service-provider.component.css']
})
export class UpdateServiceProviderComponent implements OnInit {


  constructor(private serviceProvidersService: ServiceProvidersService, private rout: ActivatedRoute,
              private zone: NgZone, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  serviceProvider = new ServiceProviders();
  private url = environment.baseURL + '/service-providers/image/';
  private readonly notifier: NotifierService;
  public addrKeys: string[];
  public addr: object;
  private currentId: any;
  private role: any;
  service: any;
  allServices: Service[];
  newS: Service[];

  formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(60)
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(2)

    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(90),
      Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
    ])
  });

  public isCurrentProvider(id: number) {
    this.currentId = JSON.parse(window.sessionStorage.getItem('user')).id;
    return this.currentId === id;
  }

  public isAdmin() {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role == 'ADMIN';
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

  addService(): void {
    let newSerivce = new Service();
    newSerivce.serviceName = this.service;
    console.log(newSerivce);
    this.serviceProvidersService.saveServiceForProvider(this.serviceProvider.id, newSerivce)
      .subscribe(data => console.log(data));
    location.reload();
    this.notifier.notify('success', 'Service added');
  }

  deleteByServiceName(serviceName: string): void {
    console.log('service name:' + serviceName + "id:" + this.serviceProvider.id);
    this.serviceProvidersService.deleteServiceInProvider(this.serviceProvider.id, serviceName)
      .subscribe(data => console.log(data));
    this.notifier.notify('success', 'Service deleted');
    location.reload();
  }


  ngOnInit() {
    window.scroll(0, 0);
    this.rout.params.subscribe(next => {
      this.serviceProvidersService.getServiceProviderById(next.id).subscribe(next => {
        if (this.isAdmin() || this.isCurrentProvider(next.userDTO.id)) {
          this.serviceProvider = next;
          console.log(next);
          console.log(this.serviceProvider);
          this.serviceProvidersService.getAllServiceIsNotPresentInProvider(this.serviceProvider.id)
            .subscribe(data => {
              this.allServices = data;
              this.allServices.forEach(el => {
                console.log(el);
              });
            });
        } else {
          this.router.navigate(['/']);
          this.notifier.notify('error', 'Access denied');
        }
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }
}
