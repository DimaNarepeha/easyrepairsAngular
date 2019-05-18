import { Component, OnInit } from '@angular/core';
import { ServiceProviders } from '../service-providers/service-providers';
import {ProvidersInfo} from './providers-info';
import {ProvidersInfoService} from './sp-general.service';

@Component({
  selector: 'app-sp-general',
  templateUrl: './sp-general.component.html',
  styleUrls: ['./sp-general.component.css']
})
export class SpGeneralComponent implements OnInit {

   providersInfo: ProvidersInfo[];
   provider = new ProvidersInfo();

   constructor( private _providerInfoService: ProvidersInfoService){}

  ngOnInit():void{
  //  this.getProvidersInfo();
  }


  getProvidersInfo(): void{
      this._providerInfoService.getAllProvidersInfo().subscribe(
          (providerData)=>{this.provider=providerData,console.log(providerData)},
           (error)=>{console.log(error);
          }
      );
  }
}
