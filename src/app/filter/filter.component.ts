import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "../landing-page/landing-page.service";
import { Service } from '../core/model/service';
import { ProvidersCriteria } from '../core/model/providers-criteria';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  private service: Service;
  private services: Service[];
  private providersCriteria = new ProvidersCriteria();

  constructor(private serviceService: LandingPageService) { }

  ngOnInit() {
    // this.serviceProviders = this.providerPage;
    // console.log(this.serviceProviders);


    this.serviceService.getAllServices()// TODO change hardcoded user here
      .subscribe(data => this.services = data);
    this.providersCriteria.location = 'Lviv';
    this.providersCriteria.minRating = 3;
}

  addProvidersCriteria(): void {

    this.providersCriteria.services = this.services.filter(x => x.choose === true);
    this.serviceService.findProvidersByParams(this.providersCriteria)
      .subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

}
