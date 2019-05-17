import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { componentRefresh, refreshDescendantViews } from '@angular/core/src/render3/instructions';
import { ServiceProviders } from '../service-providers';
import { ServiceProvidersService } from '../service-providers.service';

@Component({
  selector: 'app-update-service-provider',
  templateUrl: './update-service-provider.component.html',
  styleUrls: ['./update-service-provider.component.css']
})
export class UpdateServiceProviderComponent implements OnInit {

  serviceProvider = new ServiceProviders();
  public userFile:any = File; 


  constructor(private serviceProvidersService: ServiceProvidersService, private rout: ActivatedRoute) {
    this.rout.params.subscribe(next => {
      this.serviceProvidersService.getServiceProviderById(next['id']).subscribe(next => {
        this.serviceProvider = next;
      }, err => {
        console.log(err);
      })
      }, err => {
        console.log(err); 
    })
  }

  onSelectFile(event,id){
    const file = event.target.files[0];
    console.log(file);
    this.userFile=file; 
    this.serviceProvidersService.uploadImage(file,id);
}


  
  updateService(id: number): void {
    this.serviceProvidersService.updateServiceProvider(id, this.serviceProvider)
      .subscribe((response) => {
        console.log(response);
        alert("Provider updated!");
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

}
