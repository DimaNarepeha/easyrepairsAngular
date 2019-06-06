import {Component, NgZone, OnInit} from '@angular/core';
import {ProvidersInfo} from '../core/model/providers-info';
import {LandingPageService} from '../landing-page/landing-page.service';
import {ProvidersCriteria} from '../core/model/providers-criteria';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Service} from '../core/model/service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sp-general',
  templateUrl: './sp-general.component.html',
  styleUrls: ['./sp-general.component.css']
})
export class SpGeneralComponent implements OnInit {

  static params: HttpParams;
  checkedServices: number[] = [];
  private page = 0;
  private i = 0;
  private providerPage: Array<ProvidersInfo>;
  private totalElements: number;
  private pages: Array<number>;
  pageSize = 4;
  private url = environment.baseURL + '/service-providers/image/';
  strService: string;

  private service: Service;
  private services: Service[];
  private providersCriteria = new ProvidersCriteria();
  public title = 'Places';
  public addrKeys: string[];
  public addr: object;

  constructor(private serviceProvidersService: LandingPageService,
              private http: HttpClient,
              private rout: ActivatedRoute,
              private zone: NgZone) {
  }

  ngOnInit() {

    this.serviceProvidersService.getAllServices()
      .subscribe(data => this.services = data);
    console.log('services: ' + this.services);

    this.providersCriteria.city = null;
    this.providersCriteria.minRating = 1;
    this.providersCriteria.sortByParam = 'registrationDate';
    SpGeneralComponent.params = new HttpParams()
      .set('minRating', this.providersCriteria.minRating.toString())
      .set('sortBy', this.providersCriteria.sortByParam.toString());


    console.log(this.providersCriteria);
    console.log(SpGeneralComponent.params.toString());
    this.getServiceProvidersByPage();

  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getServiceProvidersByPage();

  }


  getServiceProvidersByPage() {
    this.serviceProvidersService.getProviderInfoByPage(this.page, this.pageSize, SpGeneralComponent.params)
      .subscribe(
        data => {
          console.log(data);
          const d = data;
          console.log(d);
          // console.log("result = " + d.result);
          this.providerPage = d.content;
          this.totalElements = d.totalElements;
          this.pages = new Array(d.totalPages);
          console.log(data.content);
          console.log(this.pages);
          console.log(this.providerPage);
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }


  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys);
      // @ts-ignore
      if (this.addr.country !== null) {
        // @ts-ignore
        this.providersCriteria.country = this.addr.country;
      }
      // @ts-ignore
      if (this.addr.country === null) {
        // @ts-ignore
        this.providersCriteria.country = null;
      }
      // @ts-ignore
      if (this.addr.locality !== null) {
        // @ts-ignore
        this.providersCriteria.city = this.addr.locality;
      }
      // @ts-ignore
      if (this.addr.locality === null) {
        // @ts-ignore
        this.providersCriteria.city = null;
      }
      // @ts-ignore
      if (this.addr.admin_area_l1 !== null) {
        // @ts-ignore
        this.providersCriteria.region = this.addr.admin_area_l1;
      }
      // @ts-ignore
      if (this.addr.admin_area_l1 === null) {
        // @ts-ignore
        this.providersCriteria.region = null;
      }

    });
    this.setProviderCriteria();
    console.log(this.providersCriteria.country + ' ' + this.providersCriteria.city + ' ' + this.providersCriteria.region);
  }

  setProviderCriteria() {
    this.providersCriteria.services = this.services.filter(x => x.choose === true);
    this.strService += this.providersCriteria.services.forEach(value => value.id + ' ');
    if (this.providersCriteria.city === null) {
      SpGeneralComponent.params = new HttpParams()
        .set('minRating', this.providersCriteria.minRating.toString())
        .set('sortBy', this.providersCriteria.sortByParam.toString())
        .append('checkedServices', JSON.stringify(this.checkedServices));

    }
    if (this.providersCriteria.city !== null) {
      SpGeneralComponent.params = new HttpParams()
        .set('minRating', this.providersCriteria.minRating.toString())
        .set('sortBy', this.providersCriteria.sortByParam.toString())
        .append('checkedServices', JSON.stringify(this.checkedServices))
        .set('city', this.providersCriteria.city.toString())
      ;
    }
    if (SpGeneralComponent.params.has('city') && this.providersCriteria.city === null) {
      SpGeneralComponent.params.delete('city');
    }
    console.log(this.providersCriteria);
    console.log(SpGeneralComponent.params.toString());

    this.getServiceProvidersByPage();
  }

  setCheckedServices() {
    this.checkedServices = [];
    this.i = 0;
    this.services
      .filter(x => x.choose === true)
      .forEach(x => {
        this.checkedServices[this.i] = x.id;
        this.i++;
      });
    console.log(this.checkedServices.toString());

    this.setProviderCriteria();
  }

}
