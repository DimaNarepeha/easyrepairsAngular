import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ServiceProviders } from '../service-providers';
import { ServiceProvidersService } from '../service-providers.service';

@Component({
  selector: 'app-add-service-providers',
  templateUrl: './add-service-providers.component.html',
  styleUrls: ['./add-service-providers.component.css']
})
export class AddServiceProvidersComponent implements OnInit {

  serviceProvider = new ServiceProviders();
  public userFile:any = File; 

  constructor(private serviceProvidersService: ServiceProvidersService) { }

  ngOnInit() {
  }

  addServicerovider(): void {
    this.serviceProvidersService.addServiceProviders(this.serviceProvider)
      .subscribe((response) => {
        console.log(response);
        alert("Provider saved!");
      }, (error) => {
        console.log(error);
      });
  }



}
