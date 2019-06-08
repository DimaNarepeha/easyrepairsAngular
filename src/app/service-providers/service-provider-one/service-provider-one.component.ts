import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ServiceProviders} from '../service-providers';
import {ServiceProvidersService} from '../service-providers.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-service-provider-one',
  templateUrl: './service-provider-one.component.html',
  styleUrls: ['./service-provider-one.component.css']
})
export class ServiceProviderOneComponent implements OnInit {

  serviceProvider = new ServiceProviders();
  private url = environment.baseURL + '/service-providers/image/';


  constructor(private serviceProvidersService: ServiceProvidersService, private rout: ActivatedRoute) {

  }


  ngOnInit() {
    this.rout.params.subscribe(next => {
      this.serviceProvidersService.getServiceProviderById(next.id).subscribe(next => {
        this.serviceProvider = next;
        console.log(this.serviceProvider);
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }


}
