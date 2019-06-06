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
}

  addProvidersCriteria(): void {

  }

}
