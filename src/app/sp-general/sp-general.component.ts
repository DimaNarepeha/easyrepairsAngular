import {Component, OnInit} from '@angular/core';
import {ProvidersInfo} from '../core/model/providers-info';
import {SpGeneralService} from './sp-general.service';
import {LandingPageService} from '../landing-page/landing-page.service';


@Component({
  selector: 'app-sp-general',
  templateUrl: './sp-general.component.html',
  styleUrls: ['./sp-general.component.css']
})
export class SpGeneralComponent implements OnInit {

  private page: number = 3;
  serviceProviders: ProvidersInfo[];
  serviceProvider = new ProvidersInfo();
  private providerPage: Array<any>;
  private pages: Array<number>;
  public userFile: any = File;

  constructor(private serviceProvidersService: LandingPageService) {
  }

  ngOnInit() {

    // console.log(this.serviceProviders);

    this.serviceProvidersService.getApprovedProviders()// TODO change hardcoded user here
      .subscribe(data => this.serviceProviders = data);
    this.serviceProviders = this.sortArrayProviders();
  }

  sortArrayProviders(): ProvidersInfo[] {
    return this.serviceProvidersService.sortProviders(this.serviceProviders, this.page);
  }

}
